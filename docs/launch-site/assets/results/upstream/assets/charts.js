/* ==========================================================================
   PSICharts â€” ECharts option builders for the PSI results site.
   Pure: data in -> ECharts option out. Requires global `echarts`.
   ========================================================================== */
(function () {
  "use strict";

  var FONT_MONO = '"Pretendard", sans-serif';
  var FONT_DISPLAY = '"Pretendard", sans-serif';

  var TOKENS = {
    dark: {
      ink: "#f8fbff", inkSoft: "#d8e2ed", inkMuted: "#a7b4c2",
      line: "#2a3340", lineStrong: "#667789",
      surface: "#040506", surfaceAlt: "#0d1117", accent: "#c23a72",
      tooltipBg: "rgba(4, 5, 6, 0.99)", tooltipBorder: "#667789",
      zoomFill: "rgba(255, 255, 255, 0.16)", zoomHandle: "#c23a72"
    },
    light: {
      ink: "#071827", inkSoft: "#26394b", inkMuted: "#536273",
      line: "#c6d2df", lineStrong: "#7b8fa4",
      surface: "#ffffff", surfaceAlt: "#f3f6fa", accent: "#a61955",
      tooltipBg: "rgba(255, 255, 255, 0.99)", tooltipBorder: "#7b8fa4",
      zoomFill: "rgba(120, 132, 148, 0.22)", zoomHandle: "#a61955"
    }
  };

  var PALETTE = {
    dark:  ["#5f9fd6", "#c23a72", "#64b887", "#cda14a", "#9aa8b7", "#b07ada", "#e08060"],
    light: ["#124f85", "#a61955", "#2f7d52", "#9a6a16", "#566b7f", "#7b42b8", "#c45a28"]
  };

  function tokens(theme) { return TOKENS[theme] || TOKENS.dark; }
  function palette(theme) { return PALETTE[theme] || PALETTE.dark; }

  function hexToRgba(hex, alpha) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.slice(0, 2), 16);
    var g = parseInt(h.slice(2, 4), 16);
    var b = parseInt(h.slice(4, 6), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  }

  function fmt(value, digits) {
    if (value == null || isNaN(value)) return "â€”";
    return Number(value).toLocaleString(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });
  }

  function areaGradient(color) {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: hexToRgba(color, 0.08) },
      { offset: 1, color: hexToRgba(color, 0.0) }
    ]);
  }

  function niceExtent(points) {
    var ys = [];
    (points || []).forEach(function (point) {
      var y = point && point.length ? point[1] : null;
      if (typeof y === "number" && isFinite(y)) ys.push(y);
    });
    if (!ys.length) return null;
    var min = Math.min.apply(null, ys);
    var max = Math.max.apply(null, ys);
    var span = max - min;
    var pad = Math.max(span * 0.1, Math.abs(max || min) * 0.02, 1);
    return {
      min: Math.floor((min - pad) * 1000) / 1000,
      max: Math.ceil((max + pad) * 1000) / 1000
    };
  }

  function visibleRuns(params, hasHighlight) {
    var selected = params.legendSelected || null;
    var visible = params.runs.filter(function (run) {
      return !selected || selected[run.name] !== false;
    });
    if (hasHighlight) {
      var highlighted = visible.filter(function (run) { return run.id === params.highlightId; });
      if (highlighted.length) return highlighted;
    }
    return visible.length ? visible : params.runs;
  }

  /* Shared base: grid, axes, tooltip, dataZoom */
  function baseOption(params) {
    var t = tokens(params.theme);
    var axisCommon = {
      nameTextStyle: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 14, fontWeight: 600 },
      axisLine: { lineStyle: { color: t.lineStrong } },
      axisTick: { lineStyle: { color: t.lineStrong } },
      axisLabel: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 12 },
      splitLine: { lineStyle: { color: t.line, type: "dashed" } }
    };

    return {
      backgroundColor: "transparent",
      color: palette(params.theme),
      animationDuration: 620,
      animationEasing: "cubicOut",
      textStyle: { fontFamily: FONT_MONO, color: t.ink },
      grid: { left: 32, right: 24, top: 46, bottom: 80, containLabel: true },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: { backgroundColor: t.surfaceAlt, color: t.ink, fontFamily: FONT_MONO },
          crossStyle: { color: t.lineStrong },
          lineStyle: { color: t.lineStrong }
        },
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        borderWidth: 1,
        padding: [10, 12],
        textStyle: { color: t.ink, fontFamily: FONT_MONO, fontSize: 12 },
        extraCssText: "border-radius: 6px;"
      },
      xAxis: Object.assign({
        type: "value",
        name: params.xLabel,
        nameLocation: "middle",
        nameGap: 30,
        scale: true
      }, axisCommon),
      yAxis: Object.assign({
        type: "value",
        name: params.yLabel,
        nameLocation: "middle",
        nameGap: 58,
        scale: true
      }, axisCommon),
      dataZoom: [
        { type: "inside", xAxisIndex: 0, filterMode: "none" },
        {
          type: "slider", xAxisIndex: 0, filterMode: "none",
          height: 20, bottom: 16,
          backgroundColor: "transparent",
          fillerColor: t.zoomFill,
          borderColor: t.line,
          dataBackground: { lineStyle: { color: t.lineStrong }, areaStyle: { color: t.line } },
          selectedDataBackground: { lineStyle: { color: t.accent }, areaStyle: { color: t.zoomFill } },
          handleStyle: { color: t.zoomHandle, borderColor: t.zoomHandle },
          moveHandleStyle: { color: t.lineStrong },
          textStyle: { color: t.inkMuted, fontFamily: FONT_MONO, fontSize: 10 }
        }
      ]
    };
  }

  function tooltipFormatter(xUnit, yUnit, yDigits) {
    return function (items) {
      if (!items || !items.length) return "";
      var x = items[0].axisValue;
      var head = '<div style="font-weight:600;margin-bottom:6px;opacity:.85">' +
        fmt(x, 3) + " " + xUnit + "</div>";
      var rows = items.map(function (it) {
        var v = it.value && it.value.length ? it.value[1] : it.value;
        return '<div style="display:flex;gap:10px;align-items:center;justify-content:space-between">' +
          '<span>' + it.marker + it.seriesName + '</span>' +
          '<strong style="font-variant-numeric:tabular-nums">' + fmt(v, yDigits) + " " + yUnit + "</strong>" +
          "</div>";
      }).join("");
      return head + rows;
    };
  }

  /* Comparison tooltip intentionally mirrors the base tooltip: time + y values only. */
  function comparisonTooltipFormatter(params) {
    return tooltipFormatter(params.xUnit, params.yUnit, params.yDigits);
  }

  /* labelMode: "static" (always shown) | "hover" (shown on series emphasis) | "none" */
  function markLineData(run, labels, labelMode, color, t, opacity, units) {
    var op = opacity == null ? 0.75 : opacity;
    units = units || {};
    var xU = units.xUnit ? " " + units.xUnit : "";
    var showStatic = labelMode === "static";
    var showHover = labelMode === "hover";
    var pill = {
      color: color, fontFamily: FONT_MONO, fontSize: 10,
      backgroundColor: t.surface, padding: [2, 4], borderRadius: 3
    };
    function item(xVal, text, position) {
      var base = Object.assign({ formatter: text, position: position }, pill);
      return {
        xAxis: xVal,
        label: Object.assign({ show: showStatic }, base),
        emphasis: { label: Object.assign({ show: showHover || showStatic }, base) }
      };
    }
    var data = [];
    if (run.ignitionX != null) {
      data.push(item(run.ignitionX, labels.ignition + " " + fmt(run.ignitionX, 2) + xU, "insideEndTop"));
    }
    if (run.burnEndX != null) {
      data.push(item(run.burnEndX, labels.burnEnd + " " + fmt(run.burnEndX, 2) + xU, "insideEndBottom"));
    }
    return {
      symbol: "none",
      lineStyle: { color: color, type: "dashed", width: 1, opacity: op },
      label: { show: showStatic },
      emphasis: { disabled: false, label: { show: showHover || showStatic } },
      blur: { lineStyle: { opacity: 0.06 }, label: { show: false } },
      data: data
    };
  }

  function markPointData(run, labels, labelMode, color, t, opacity, units) {
    if (!run.peak || run.peak.x == null) return undefined;
    var op = opacity == null ? 1 : opacity;
    units = units || {};
    var xU = units.xUnit ? " " + units.xUnit : "";
    var yU = units.yUnit ? " " + units.yUnit : "";
    var yD = units.yDigits == null ? 1 : units.yDigits;
    var showStatic = labelMode === "static";
    var showHover = labelMode === "hover";
    var peakLabel = labels.peak + " " + fmt(run.peak.y, yD) + yU + "\n@ " + fmt(run.peak.x, 2) + xU;
    var labelStyle = {
      formatter: peakLabel, color: color, fontFamily: FONT_MONO, fontSize: 10,
      lineHeight: 13, align: "center", position: "top", distance: 8,
      backgroundColor: t.surface, padding: [3, 5], borderRadius: 4
    };
    return {
      symbol: "circle",
      symbolSize: 9,
      itemStyle: { color: color, borderColor: t.surface, borderWidth: 2, opacity: op },
      label: { show: showStatic },
      emphasis: { disabled: false, label: { show: showHover || showStatic } },
      blur: { itemStyle: { opacity: 0.06 }, label: { show: false } },
      data: [{
        coord: [run.peak.x, run.peak.y],
        label: Object.assign({ show: showStatic }, labelStyle),
        emphasis: { label: Object.assign({ show: showHover || showStatic }, labelStyle) }
      }]
    };
  }

  /* Comparison chart: multiple runs, one measurement (thrust|pressure).
     params.viewMode: "overview" | "focus" | "single"
     params.selectedIds: string[] (focus mode â€” which runs to show)
     params.highlightId: string | "all" (single mode) */
  function comparisonOption(params) {
    var t = tokens(params.theme);
    var opt = baseOption(params);
    var viewMode = params.viewMode || "single";
    var units = { xUnit: params.xUnit, yUnit: params.yUnit, yDigits: params.yDigits };
    opt.tooltip.formatter = tooltipFormatter(params.xUnit, params.yUnit, params.yDigits);

    /* ---- Overview: all runs, hover-reveal, no permanent labels ---- */
    if (viewMode === "overview") {
      var allData = params.runs.reduce(function (acc, r) { return acc.concat(r.data || []); }, []);
      var ext = niceExtent(allData);
      if (ext) { opt.yAxis.min = ext.min; opt.yAxis.max = ext.max; }
      opt.legend = { show: false };
      opt.series = params.runs.map(function (run) {
        return {
          name: run.name,
          type: "line",
          showSymbol: false,
          smooth: 0.12,
          sampling: "lttb",
          lineStyle: { color: run.color, width: 1.4 },
          itemStyle: { color: run.color },
          emphasis: { focus: "series", blurScope: "global", lineStyle: { width: 3, opacity: 1 } },
          blur: { lineStyle: { opacity: 0.18 } },
          markLine: markLineData(run, params.labels, "none", run.color, t, null, units),
          markPoint: markPointData(run, params.labels, "none", run.color, t, null, units),
          data: run.data
        };
      });
      return opt;
    }

    /* ---- Focus: selected runs only; event/peak labels reveal on hover ---- */
    if (viewMode === "focus") {
      var sel = params.selectedIds || [];
      var focused = params.runs.filter(function (r) { return sel.indexOf(r.id) !== -1; });
      var n = focused.length;
      var focusData = focused.reduce(function (acc, r) { return acc.concat(r.data || []); }, []);
      var ext2 = niceExtent(focusData);
      if (ext2) { opt.yAxis.min = ext2.min; opt.yAxis.max = ext2.max; }
      opt.legend = {
        type: "scroll", top: 8, left: "center", icon: "roundRect",
        itemWidth: 18, itemHeight: 4,
        textStyle: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 11 },
        inactiveColor: t.inkMuted,
        data: focused.map(function (r) { return r.name; })
      };
      opt.series = focused.map(function (run) {
        return {
          name: run.name, type: "line", showSymbol: false, smooth: 0.12, sampling: "lttb",
          lineStyle: { color: run.color, width: 2.2 },
          itemStyle: { color: run.color },
          emphasis: { focus: "series", blurScope: "global", lineStyle: { width: 3 } },
          blur: { lineStyle: { opacity: 0.18 } },
          areaStyle: n === 1 ? { color: areaGradient(run.color) } : undefined,
          markLine: markLineData(run, params.labels, "none", run.color, t, null, units),
          markPoint: markPointData(run, params.labels, "none", run.color, t, null, units),
          data: run.data
        };
      });
      return opt;
    }

    /* ---- Single: only the selected run, with static event/peak labels ---- */
    var hasHighlight = params.highlightId && params.highlightId !== "all";
    var only = hasHighlight
      ? params.runs.filter(function (r) { return r.id === params.highlightId; })
      : params.runs.slice(0, 1);
    if (!only.length) only = params.runs.slice(0, 1);
    var ext3 = niceExtent(only.reduce(function (acc, r) { return acc.concat(r.data || []); }, []));
    if (ext3) { opt.yAxis.min = ext3.min; opt.yAxis.max = ext3.max; }
    opt.legend = { show: false };
    opt.series = only.map(function (run) {
      return {
        name: run.name, type: "line", showSymbol: false, smooth: 0.12, sampling: "lttb",
        lineStyle: { color: run.color, width: 2.6 },
        itemStyle: { color: run.color },
        emphasis: { focus: "none", lineStyle: { width: 3 } },
        areaStyle: { color: areaGradient(run.color) },
        markLine: markLineData(run, params.labels, "none", run.color, t, 0.75, units),
        markPoint: markPointData(run, params.labels, "none", run.color, t, 1, units),
        data: run.data
      };
    });
    return opt;
  }

  /* Detail chart: single run, multiple signals (raw/corrected/filtered).
     params: { theme, xLabel, yLabel, xUnit, yUnit, yDigits, labels, series:[{name,color,data,dashed,primary}], ignitionX, burnEndX, peak } */
  function detailOption(params) {
    var t = tokens(params.theme);
    var opt = baseOption(params);
    opt.tooltip.formatter = tooltipFormatter(params.xUnit, params.yUnit, params.yDigits);
    opt.legend = {
      top: 8,
      left: "center",
      icon: "roundRect",
      itemWidth: 18,
      itemHeight: 4,
      textStyle: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 11 },
      inactiveColor: t.inkMuted,
      data: params.series.map(function (s) { return s.name; })
    };

    var detailData = params.series.reduce(function (acc, s) { return acc.concat(s.data || []); }, []);
    var detailExt = niceExtent(detailData);
    if (detailExt) { opt.yAxis.min = detailExt.min; opt.yAxis.max = detailExt.max; }

    opt.series = params.series.map(function (s, i) {
      var isPrimary = !!s.primary;
      var series = {
        name: s.name,
        type: "line",
        showSymbol: false,
        smooth: 0.1,
        sampling: "lttb",
        z: isPrimary ? 5 : 3,
        lineStyle: {
          color: s.color,
          width: isPrimary ? 2.8 : 1.5,
          type: s.dashed ? "dashed" : "solid",
          opacity: isPrimary ? 1 : 0.72
        },
        itemStyle: { color: s.color },
        emphasis: { focus: "series" },
        areaStyle: isPrimary ? { color: areaGradient(s.color) } : undefined,
        data: s.data
      };
      if (isPrimary) {
        var dUnits = { xUnit: params.xUnit, yUnit: params.yUnit, yDigits: params.yDigits };
        series.markLine = markLineData(
          { ignitionX: params.ignitionX, burnEndX: params.burnEndX },
          params.labels, "none", t.inkSoft, t, null, dUnits
        );
        series.markLine.lineStyle.color = t.lineStrong;
        if (params.peak) {
          series.markPoint = markPointData({ peak: params.peak }, params.labels, "none", s.color, t, null, dUnits);
        }
      }
      return series;
    });
    return opt;
  }

  /* Single-metric bar chart with real values + own scale.
     params: { theme, title, unit, yDigits, names:[date], colors:[hex], values:[num], displays:[str], dim:[bool] } */
  function metricBarOption(params) {
    var t = tokens(params.theme);
    var vals = (params.values || []).filter(function (v) { return v != null && isFinite(v); });
    var rotate = (params.names || []).length > 5 ? 30 : 0;
    return {
      backgroundColor: "transparent",
      animationDuration: 480,
      animationEasing: "cubicOut",
      textStyle: { fontFamily: FONT_MONO, color: t.ink },
      grid: { left: 6, right: 14, top: 14, bottom: rotate ? 14 : 6, containLabel: true },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        borderWidth: 1,
        textStyle: { color: t.ink, fontFamily: FONT_MONO, fontSize: 12 },
        extraCssText: "border-radius: 8px;",
        formatter: function (items) {
          if (!items || !items.length) return "";
          var it = items[0];
          var color = (params.colors && params.colors[it.dataIndex]) || t.accent;
          var disp = (params.displays && params.displays[it.dataIndex] != null) ? params.displays[it.dataIndex] : it.value;
          var marker = '<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:' + color + ';margin-right:6px;vertical-align:middle"></span>';
          return '<div style="font-weight:600;margin-bottom:4px">' + it.name + "</div>" +
            '<div style="display:flex;gap:12px;justify-content:space-between">' +
            "<span>" + marker + params.title + "</span>" +
            '<strong style="font-variant-numeric:tabular-nums">' + disp + "</strong></div>";
        }
      },
      xAxis: {
        type: "category",
        data: params.names,
        axisLine: { lineStyle: { color: t.lineStrong } },
        axisTick: { show: false },
        axisLabel: { color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 10, interval: 0, rotate: rotate }
      },
      yAxis: {
        type: "value",
        name: params.unit,
        nameTextStyle: { color: t.inkMuted, fontFamily: FONT_MONO, fontSize: 10, align: "left" },
        scale: true,
        splitNumber: 4,
        axisLine: { show: false },
        axisLabel: {
          color: t.inkSoft, fontFamily: FONT_MONO, fontSize: 10,
          formatter: function (val) { return (Math.round(val * 100) / 100).toLocaleString(); }
        },
        splitLine: { lineStyle: { color: t.line, type: "dashed" } }
      },
      series: [{
        type: "bar",
        barMaxWidth: 48,
        emphasis: { focus: "self" },
        data: (params.values || []).map(function (v, i) {
          var dim = params.dim && params.dim[i];
          return {
            value: v,
            itemStyle: {
              color: (params.colors && params.colors[i]) || t.accent,
              borderRadius: [4, 4, 0, 0],
              opacity: dim ? 0.26 : 1
            }
          };
        })
      }]
    };
  }

  /* Minimal hero sparkline: single series, no axes/tooltip. */
  function sparkOption(params) {
    var color = params.color || palette(params.theme)[0];
    return {
      backgroundColor: "transparent",
      animation: true,
      animationDuration: 900,
      grid: { left: 2, right: 2, top: 8, bottom: 2 },
      xAxis: { type: "value", show: false, scale: true },
      yAxis: { type: "value", show: false, scale: true },
      tooltip: { show: false },
      series: [{
        type: "line",
        showSymbol: false,
        smooth: 0.18,
        sampling: "lttb",
        lineStyle: { color: color, width: 2.2 },
        areaStyle: { color: areaGradient(color) },
        data: params.data
      }]
    };
  }

  window.PSICharts = {
    palette: palette,
    tokens: tokens,
    comparisonOption: comparisonOption,
    detailOption: detailOption,
    metricBarOption: metricBarOption,
    sparkOption: sparkOption,
    fmt: fmt
  };
})();

import {readFileSync} from 'node:fs';
const text=(en,ko)=>({en,ko});
const manifests=['media-manifest.json','gallery-media-manifest.json','onedrive-media-manifest.json']
  .flatMap(file=>JSON.parse(readFileSync(new URL(`./assets/${file}`,import.meta.url),'utf8')));
const photo=(src,en,ko)=>{
  const full=manifests.find(item=>item.file===src);
  const thumbnail=manifests.find(item=>item.file===src.replace('.webp','-thumb.webp'));
  if(!full || !thumbnail)throw new Error(`Missing prepared gallery derivative: ${src}`);
  return {src,width:full.dimensions[0],height:full.dimensions[1],thumb:thumbnail.file,thumbWidth:thumbnail.dimensions[0],thumbHeight:thumbnail.dimensions[1],alt:text(en,ko),caption:text(en,ko)};
};
export const events=[
  {id:'launch-dec-2025',date:'2025-12-05',dateLabel:text('5 December 2025','2025년 12월 5일'),label:text('Launch day','발사일'),description:text('A day at the field: the people, the assembled vehicle and the launch rail.','현장에서 함께한 사람들, 조립된 기체와 발사 레일의 기록.'),photos:[
    photo('field-team.webp','PSI members gathered with the rocket at the launch field.','발사 현장에서 로켓과 함께한 PSI 구성원들.'),
    photo('rocket-full.webp','The complete rocket photographed at the field.','현장에서 촬영한 로켓의 전체 모습.'),
    photo('rocket-detail.webp','A close view of the rocket body and its assembled hardware.','로켓 동체와 조립된 하드웨어의 가까운 모습.'),
    photo('launch-rail.webp','The rocket mounted on its launch rail.','발사 레일에 설치한 로켓.'),
    photo('launch-day-team.webp','The team together by the sea on launch day.','발사 당일 바닷가에서 함께한 팀.')
  ]},
  {id:'rocket-dec-2025',date:'2025-12-06',dateLabel:text('6 December 2025','2025년 12월 6일'),label:text('Back with the rocket','로켓과 함께'),description:text('One moment with the vehicle and its parachute.','로켓과 낙하산을 함께 든 순간.'),photos:[photo('rocket-team-indoor.webp','Members with the rocket and its parachute.','로켓과 낙하산을 함께 든 부원들.')]},
  {id:'nura-aug-2025',date:'2025-08',dateLabel:text('August 2025','2025년 8월'),label:text('NURA: building and field preparation','NURA 제작과 현장 준비'),description:text('Hardware checks and preparation at the field. Month attributed from the activity archive; exact capture dates are unverified.','기체 점검과 현장 준비의 기록입니다. 활동 아카이브의 월별 분류를 따르며 정확한 촬영일은 확인되지 않았습니다.'),photos:[
    photo('nura-field-2025.webp','The PSI team placing the vehicle on the launch rail and preparing at the field.','발사 레일에 기체를 세우고 현장에서 준비하는 PSI 팀.'),
    photo('nura-fins-2025.webp','Checking the assembled rear fins of the vehicle.','기체 후방 핀 조립부의 제작 상태를 확인하는 모습.'),
    photo('nura-airframe-2025.webp','An airframe section checked during NURA competition preparation.','NURA 발사대회를 준비하며 점검한 기체 구획.'),
    photo('nura-team-2025.webp','The NURA preparation team with airframe sections.','기체와 함께한 NURA 대회 준비 팀.')
  ]},
  {id:'conference-jul-2025',date:'2025-07-19',dateLabel:text('19–20 July 2025','2025년 7월 19–20일'),label:text('NURA rocket conference','NURA 로켓학술대회'),description:text('The event dates are recorded on the conference banner.','행사 현수막에서 확인한 학술대회 일정입니다.'),photos:[photo('nura-conference-2025.webp','PSI members at the 2025 NURA university rocket conference.','2025 NURA 전국대학교 로켓학술대회에 함께한 PSI 구성원들.')]},
  {id:'test-may-2025',date:'2025-05',dateLabel:text('May 2025','2025년 5월'),label:text('Test preparation, together','시험 준비와 팀 활동'),description:text('Assembly, inspection and the team around the apparatus. These are preparation photographs, not firing results; the month follows the activity archive.','시험 장치의 조립과 점검, 함께한 팀의 모습입니다. 연소 결과 사진이 아닌 준비 기록이며 활동 아카이브의 월별 분류를 따릅니다.'),photos:[
    photo('test-workshop-2025.webp','Members assembling and inspecting the test apparatus.','시험 장치를 조립하고 점검하는 구성원들.'),
    photo('test-team-2025.webp','The PSI team with the apparatus during combustion-test activity.','연소실험 활동에서 시험 장치와 함께한 PSI 팀.')
  ]},
  {id:'community-apr-2025',date:null,dateLabel:text('Spring 2025','2025년 봄'),label:text('A spring gathering','봄 MT'),description:text('Time together outside the workshop. Season attributed from the club archive; exact capture date is unverified.','작업실 밖에서 함께 보낸 시간입니다. 동아리 아카이브의 계절별 분류를 따르며 정확한 촬영일은 확인되지 않았습니다.'),photos:[photo('spring-community-2025.webp','PSI members spending time together at the spring club gathering.','봄 MT에서 함께 시간을 보낸 PSI 구성원들.')]}
];

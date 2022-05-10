export const setDuration = duration =>{
    const timeList = duration?.split('').slice(2)
    let timeObj = {H: '00', M: '00', S: '00'};
    let str = [0, 0];
    for(let i=0;i<timeList?.length;i++){
      if(timeList[i]==='H'|| timeList[i]==='M' || timeList[i]==='S') {
        str = str.join('');
        timeObj = {...timeObj, [timeList[i]]: str};
        str = [0, 0];
      } else {
        str.push(timeList[i]);
        str.shift();
      }
    }
    const timeArr = Object.values(timeObj);
    if(Number(timeArr[0])===0) return Number(timeArr[1])+":"+timeArr[2];
    else return Number(timeArr[0])+":"+timeArr[1]+":"+timeArr[0];
  }
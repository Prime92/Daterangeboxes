for (let k = 0; k < i; k++) {
  let indexH = 0;
  let elmW = layout[i].w;
  // console.log(i, elmW);
  let lastItemsWOfX = null;
  for (let j = i; j >= 0; j--) {
    if (layout[j].x === x) {
      if (lastItemsWOfX === null) {
        lastItemsWOfX = layout[j].w;
      }
      indexH += layout[j].h;
    }
  }

  // let notClrFlg = null;
  // for (let m = x + 1; m < i; m++) {}
  if (indexH > y) {
    // console.log(i, x, y, indexH);
    x += lastItemsWOfX;
    if (x >= len - 1) {
      y++;
      x = 0;
      k = 0;
      // console.log("here");
    }
  } else {
    break;
  }
}

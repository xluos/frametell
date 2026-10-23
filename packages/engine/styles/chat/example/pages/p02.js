// Original chat-rap-video v11 data model and time units.
ENGINE.visual('p02', P => {
  P.nativeScene((N,host) => {
    const conversation=N.create(host,{
      header:{name:'核对之后再回复'},
      characters:[{id:'a',side:'left',name:'问'},{id:'b',side:'right',name:'答'}],
      elements:[{"id": "m0", "type": "bubble", "from": "a", "text": "截图只展示了一部分。", "start_ms": 0, "duration_ms": 5000, "emotion": "normal", "camera_mode": "bubble"}, {"id": "m1", "type": "bubble", "from": "b", "text": "把上下文一起核对。", "start_ms": 3200, "duration_ms": 5000, "emotion": "normal", "camera_mode": "bubble"}, {"id": "m2", "type": "bubble", "from": "a", "text": "现在知道差异在哪里了。", "start_ms": 6400, "duration_ms": 5000, "emotion": "normal", "camera_mode": "bubble"}]
    });
    return {render:t=>conversation.renderAt(Math.max(0,t)*1000),dispose:()=>conversation.dispose()};
  });
});

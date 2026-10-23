# chat-rap-video v11

`N.create(host, script, assets = {})` constructs the ORIGINAL HTML template inside this scene's Shadow DOM, and returns `{renderAt(milliseconds), dispose()}`. Return `{render: t => chat.renderAt(t*1000), dispose: () => chat.dispose()}` from nativeScene. This template's original viewport is 1080 x 1920; it is fitted into either output orientation. All source CSS, timings, text and animation formulas are retained. The adapter scopes CSS/document access and retires transient stack clones before the next frame instead of on a wall-clock timer.

`script` uses the upstream data model:

```js
{header:{name:'Team'},characters:[{id:'a',side:'left',name:'A'},{id:'b',side:'right',name:'B'}],
 elements:[{id:'m1',type:'bubble',from:'a',text:'Question',start_ms:0,duration_ms:2500,emotion:'normal',camera_mode:'bubble'}]}
```

Use host.at(cueIndex)*1000 for message start_ms. Types include bubble, stack, hook, sticker, beam, textzoom, flash. Match source units (milliseconds). For an image, `script.avatars` maps actor ids to asset names, and `assets` maps names to local data URIs; absent images use original letter placeholders. Do not require external image generation, music, whisper or any paid provider to render the picture. The original source is `engine/native/sources/chat-rap-video/assets/chat_template_v11.html`.

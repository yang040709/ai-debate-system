import mitt from 'mitt'
/* 
以后注意一下
type Events = { update: string; delete: number };
const emitter = mitt<Events>();
emitter.emit('update', 'ok');  // ✅
emitter.emit('delete', 42);     // ✅
emitter.emit('update', 100);    // ❌ 类型错误

*/
type Events = { scroll: number; scrollTop?: undefined }
export default mitt<Events>()

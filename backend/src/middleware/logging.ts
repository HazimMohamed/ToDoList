import express from 'express';

function logging() {
  return function _logging(req: express.Request, res: express.Response, next: any) {
    console.log(`[${new Date(Date.now()).toLocaleString()}] Received ${req.method} request at URL ${req.url} with body ${JSON.stringify(req.body)}`);
    let responseData: string[] = []
    let standardWrite = res.write;
    res.write = function(...args) {
      responseData.push(args[0].toString());
      return standardWrite.apply(res, args);
    }
    let standardEnd = res.end;
    // @ts-ignore
    res.end = function(...args) {
      if (args[0]) {
        responseData.push(args[0].toString());
      }
      console.log('Response:');
      console.log('\t\t' + responseData.reduce((prev: string, curr: string) => prev + curr, ''));
      console.log();

      return standardEnd.apply(res, args);
    }
    next();
  }
}

export {logging};
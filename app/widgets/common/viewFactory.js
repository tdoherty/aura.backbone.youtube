define(function () {

  //factory method
  return function (sandbox, opts) {
    return sandbox.mvc.View.extend(sandbox.util.extend(opts, { sandbox: sandbox }));
  };
});
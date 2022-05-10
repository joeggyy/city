define
(
    "Modules/Custom",
    [
        
    ],
    function
    (
        
    )
    {
        console.info('Custom loaded');

        // global variables (widget, UWA, document)

        // Private functions. Not accessible by other modules. Accesible within this module only
        var get = 'Get';

        function doSomething(args) {
            console.info('doSomething', args);
            
            return args;
        }

        // Declare public functions or variable here. Accessible by other modules.
        var exports = {

            myHello: 'Hello',

            myGet: get,

            myFunction: function(arg1, arg2) {
                console.info(arg1, arg2);

                return doSomething({par1: arg1, par2: arg2});
            }
        };

        return exports;
    }
);
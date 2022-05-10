define
(
    'Widget/Main',
    [
        // 3DEXPERIENCE Cloud Platform JS modules 
        'DS/i3DXCompassServices/i3DXCompassServices'
        ,'DS/PlatformAPI/PlatformAPI'
        ,'DS/WAFData/WAFData'
    ],
    function
    (
        i3DXCompassServices
        ,PlatformAPI
        ,WAFData
    )
    {
        // global variables (widget, UWA, document)

        // Private functions or variables. Not accessible by other modules. Accesible within this module only
        var _input = {}, globeURL, tenant;

        // ===== Helper function to make request to City API for any available topic
        function makeAPIRequest(topic, data) {
            var request = {
                messageId: UWA.Utils.getUUID(),
                publisher: widget.id
            };

            if(UWA.is(data, 'object')) {
                request.data = data;
            }

            console.info('xCity.' + topic, request);
            // TODO - Set your publish topic and data here using PlatformAPI.publish(<topic>, data)
			PlatformAPI.publish('xCity.ping', {
				
					"messageId": "3a7b04c7-2f80-481b-b8dd-43cfc392dea7", // Optional
					"publisher": "9MlIiKCA2IIyE5kHL4gO" // custom widget id
				
			});
		}

        // ===== Function to setup basic City API subscription 
        function setupSubscriptions() {
            // TODO - Set your topic subscription here using PlatformAPI.subscribe(<topic>, callback function)
			PlatformAPI.subscribe('xCity.resolve', function resolveCallback(result) {
			
			console.info(' I got message back from city resolve: ====>',  result);
			
			});

        }

        // REST API
        function makeRESTAPIRequest() {
            // TODO - form correct REST API using cached globe service host URL and the REST API verb then the query parameter
            var queryUrl = '<your_REST_API_URL>';
            var config = {
                method: 'GET',
                onComplete: function(rs, stat, header) {
                    console.log("QUERY SUCCESS: ", rs, stat, header);
                },
                onFailure: function(rs, stat, header) {
                    console.error("QUERY FAILED: ", rs, stat, header);
                }
            };

            WAFData.authenticatedRequest(queryUrl, config);
        }

        function createUserInterface() {
            var container = new UWA.createElement('div');
            container.inject(widget.body);

            _input.btnPing = new UWA.createElement('button', {value: 'Ping', title: 'Ping', name: 'Ping', html: 'Ping'});
            _input.btnPing.addEventListener('click', function(e) {
                makeAPIRequest('ping');
            });

            _input.btnRESTReferential = new UWA.createElement('button', {value: 'REST Referential', title: 'REST Referential', name: 'REST Referential', html: 'REST Referential'});
            _input.btnRESTReferential.addEventListener('click', function(e) {
                makeRESTAPIRequest();
            });
            
            for(var key in _input) {
                _input[key].inject(container);
            }
        }

        // Declare public functions or variables here. Accessible by other modules. Call it by "Main.<function>". Usage sample, e.g. Main.onLoad() 
        var exports = {
            onLoad: function() {
                console.info("Global var widget", widget);

                setupSubscriptions();

                widget.setBody('Subscription setup complete. Try to click on 3DView map of City widget then observe the console log for API input/output.'); // Set widget user interface container to empty to remove "Loading" message.

                // Retrieve Globe service URL then cache it
                i3DXCompassServices.getPlatformServices({
                    platformId: widget.data.x3dPlatformId,
                    onComplete: function (data) {
                        console.info("Platform Services Retrieved: ", data);
                        globeURL = data.globe;
                        tenant = data.platformId;
                    }
                });

                createUserInterface();
            },

            onResize: function() {
                console.info("onResize");
            },

            onViewChange: function() {
                console.info("onViewChange");
            },

            onEdit: function() {
                console.info("onEdit");
            },

            onRefresh: function() {
                console.info("onRefresh");
            },

            endEdit: function() {
                console.info("endEdit");
            }
        };

        return exports;
    }
);
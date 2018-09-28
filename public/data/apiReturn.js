let data = {
    "input":"Predict inventory sales for the 2018 holiday season.",
    "phrases":[
        {
            "text":"Predict inventory sales",
            "chunks":[
                {
                    "text":"sales",
                    "types":[
                        {
                            "type":"QUANTITY",
                            "description":"Measurements, as of weight or distance."
                        },
                        {
                            "type":"MONEY",
                            "description":"Monetary values, including unit."
                        }                        
                    ]
                },
                {
                    "text":"Predict",
                    "types":[
                        {
                            "type":"QUANTITY",
                            "description":"Measurements, as of weight or distance."
                        },
                        {
                            "type":"MONEY",
                            "description":"Monetary values, including unit."
                        }                        
                    ]
                }
            ]
        },
        {
            "text":"2018 holiday season",
            "chunks":[
                {
                    "text":"2018",
                    "types":[
                        {
                            "type":"DATE",
                            "description":"Absolute or relative dates or periods."
                        },                                               
                    ]
                },
                {
                    "text":"2018 holiday season",
                    "types":[
                        {
                            "type":"EVENT",
                            "description":"Named hurricanes, battles, wars, sports events, etc."
                        },                                             
                    ]
                }
            ]
        },
        
    ]
}
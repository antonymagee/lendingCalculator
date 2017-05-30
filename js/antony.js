 $(document).ready(function () {

            // Creates the Chart, with the desired values 
            var realValues = [0, 1, 3, 5, 10, 20];

            $('#ex19').bootstrapSlider({
                value: 0,
                max: 4,
                min: 0,
                step: 1,
                ticks: [1, 2, 3, 4, 5],
                ticks_labels: ["1", "3", "5", "10", "20"],

            })
                .on('change', function (data) {
                    $("#ex6SliderVal").text(realValues[data.value.newValue])
                    calculate()
                });

          


            // This block attatches listeners to the input fields to make sure any changes 
            // spark the calculate method to always update the total.
            // also calls the caculate() function to update the total displayed numbers      
            $("#ex19").on("slideStop", function () {

                calculate()
            });


            $("#ex19").on("slide", function () {

                calculate()
            });

            $("#loanAmount").keyup(function () {

                calculate()
            });

            $("#inputInterest").keyup(function () {

                calculate()
            });

            // ----------------------------------------------------------------------


            // Reset button, removes the Div's for the slider and chart and seeds with a blank container
            $("#reset").click(function () {

                
                $("#sliderInput").html("<input id='ex19' type='text'>");
                $("#monthlyChartBlockDiv").html(" <canvas id='monthlyChartBlock' width='400' height='250'></canvas>");
                $("#quarterlyChartBlockDiv").html(" <canvas id='quarterlyChartBlock' width='400' height='250'></canvas>");
                $("#semiannuallyChartBlockDiv").html(" <canvas id='semiannuallyChartBlock' width='400' height='250'></canvas>");
                $("#annuallyChartBlockDiv").html(" <canvas id='annuallyChartBlock' width='400' height='250'></canvas>");



                $('#ex19').bootstrapSlider({
                    value: 0,
                    max: 4,
                    min: 0,
                    step: 1,
                    ticks: [1, 2, 3, 4, 5],
                    ticks_labels: ["1", "3", "5", "10", "20"],

                })
                    .on('change', function (data) {
                        $("#ex6SliderVal").text(realValues[data.value.newValue])
                        calculate()
                    });  

                // Start with all the results boxes initialized as blank  

                $("#tab1paymentMonthly").empty();
                $("#tab1yearlyPayment").empty();
                $("#tab1total").empty();
                $("#tab1totalInterest").empty();
                $("#tab1PrincipalFirst12").empty();
                $("#tab1InterestFirst12").empty();

                $("#tab2Quarterly").empty();
                $("#tab2Yearly").empty();
                $("#tab2Total").empty();
                $("#tab2TotalInterest").empty();
                $("#tab2PrincipalFirst12").empty();
                $("#tab2InterestFirst12").empty();

                $("#tab3SemiAnnual").empty();
                $("#tab3Yearly").empty();
                $("#tab3Total").empty();
                $("#tab3TotalInterest").empty();
                $("#tab3PrincipalFirst12").empty();
                $("#tab3InterestFirst12").empty();

                $("#tab4Annually").empty();
                //$("#tab4Yearly").empty();
                $("#tab4Total").empty();
                $("#tab4TotalInterest").empty();
                $("#tab4PrincipalFirst12").empty();
                $("#tab4InterestFirst12").empty();


            });

/*            // Adds styling for the currency to be displayed in the LoanAmount input.
            var cleaveNumeral = new Cleave('tel', {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });*/
        
            var $form = $( "#inputForm" );
            var $input = $form.find( "#loanAmount" );

             $input.on( "keyup", function( event ) {
            
            
            // When user select text in the document, also abort.
            var selection = window.getSelection().toString();
            if ( selection !== '' ) {
                return;
            }
            
            // When the arrow keys are pressed, abort.
            if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
                return;
            }
            
            
            var $this = $( this );
            
            // Get the value.
            var input = $this.val();
            
            var input = input.replace(/[\D\s\._\-]+/g, "");
                    input = input ? parseInt( input, 10 ) : 0;

                    $this.val( function() {
                        return ( input === 0 ) ? "" : input.toLocaleString( "en-US" );
                    } );
        } );
        
        /**
         * ==================================
         * When Form Submitted
         * ==================================
         */
        $form.on( "submit", function( event ) {
            
            var $this = $( this );
            var arr = $this.serializeArray();
        
            for (var i = 0; i < arr.length; i++) {
                    arr[i].value = arr[i].value.replace(/[($)\s\._\-]+/g, ''); // Sanitize the values.
            };
            
            console.log( arr );
            
            event.preventDefault();
        });


            // Draws the chart with the calues passed in.
            function chartjs(principal, payments, justInterest, tab) {
                debugger;
                // payments is the loan term in months - change to years
                var paymentYears = payments / 12
                // full loan + interest amount divided by term
                var chartTotalpayment = parseInt((principal + justInterest) / paymentYears).toFixed(2);
                // find the principal per year
                var yearlyPrincipal = parseInt(principal / paymentYears).toFixed(2);
                var yearlyInterest = parseInt(justInterest / paymentYears).toFixed(2);


                if (paymentYears == 1) {
                    var timeLine = ["0", "1"];
                    var totalLine = ["0", chartTotalpayment];
                    var principleLine = ["0",
                        principal];
                } else if (paymentYears == 3) {
                    var timeLine = ["0", "1", "2", "3"];
                    var totalLine = ["0",
                        chartTotalpayment,
                        chartTotalpayment * 2,
                        chartTotalpayment * 3];
                    var principleLine = ["0",
                        principal - (yearlyPrincipal * 2),
                        principal - (yearlyPrincipal),
                        principal
                    ];
                } else if (paymentYears == 5) {
                    var timeLine = ["0", "1", "2", "3", "4", "5"];
                    var totalLine = ["0",
                        chartTotalpayment,
                        chartTotalpayment * 2,
                        chartTotalpayment * 3,
                        chartTotalpayment * 4,
                        chartTotalpayment * 5];
                    var principleLine = ["0",
                        principal - (yearlyPrincipal * 4),
                        principal - (yearlyPrincipal * 3),
                        principal - (yearlyPrincipal * 2),
                        principal - (yearlyPrincipal),
                        principal,
                    ];
                } else if (paymentYears == 10) {
                    var timeLine = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
                    var totalLine = ["0",
                        chartTotalpayment,
                        chartTotalpayment * 2,
                        chartTotalpayment * 3,
                        chartTotalpayment * 4,
                        chartTotalpayment * 5,
                        chartTotalpayment * 6,
                        chartTotalpayment * 7,
                        chartTotalpayment * 8,
                        chartTotalpayment * 9,
                        chartTotalpayment * 10];
                    var principleLine = ["0",
                        principal - (yearlyPrincipal * 9),
                        principal - (yearlyPrincipal * 8),
                        principal - (yearlyPrincipal * 7),
                        principal - (yearlyPrincipal * 6),
                        principal - (yearlyPrincipal * 5),
                        principal - (yearlyPrincipal * 4),
                        principal - (yearlyPrincipal * 3),
                        principal - (yearlyPrincipal * 2),
                        principal - (yearlyPrincipal),
                        principal,
                    ];
                } else if (paymentYears == 20) {
                    var timeLine = ["0", "1", "5", "10", "15", "20"];
                    var totalLine = ["0",
                        chartTotalpayment,
                        chartTotalpayment * 5,
                        chartTotalpayment * 10,
                        chartTotalpayment * 15,
                        chartTotalpayment * 20];
                    var principleLine = ["0",
                        principal - (yearlyPrincipal * 19),
                        principal - (yearlyPrincipal * 15),
                        principal - (yearlyPrincipal * 10),
                        principal - (yearlyPrincipal * 5),
                        principal,
                    ];
                }

                var ctx = document.getElementById(tab).getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: timeLine,
                        datasets: [{
                            label: 'Principal + Interest',
                            data: totalLine,
                            backgroundColor: "rgba(174, 230, 173, 0.4)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)"
                        }, {
                            label: 'Principal',
                            data: principleLine,
                            backgroundColor: "rgba(132, 189, 225, 1)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)"

                        }]
                    }
                });

            }

            function calculate() {

                // Look up the input and output elements in the document
                // Loan Amount
                debugger;
                var amount = document.getElementById("loanAmount");
                // Interest Rate
                var interest = document.getElementById("inputInterest");
                // Slider value 
                var years = parseFloat(document.getElementById("ex6SliderVal").childNodes[0].nodeValue);
                // Takes loan amount input and changes it to an float

                
                
                var principal = parseInt(amount.value.toString().replace(/,/g, ''), 10);

                //var principal = parseInt(amount.value);
                // Takes Interest input and changes to float with 3 decimal places
                var inputInterest = parseFloat(interest.value).toFixed(3) / 100;
                // Takes the number of years to amaturize and converts to months
                var payments = years * 12;

                calculateMonthly(principal, inputInterest, years, payments);
                calculateQuarterly(principal, inputInterest, years, payments);
                calculateSemiAnnually(principal, inputInterest, years, payments);
                calculateAnnually(principal, inputInterest, years, payments);

            }

            function calculateMonthly(principal, inputInterest, years, payments) {
                // Sets the payment frequency per year to 12
                var paymentFreqPerYear = 12;
                // Set the time a year the loan compounds = Anually 
                var compounding = 1;
                // Derived from the effective interest rate provided by Bryant
                var effectiveInterest = Math.pow((1 + (inputInterest / compounding)), (compounding / paymentFreqPerYear)) - 1;
                // Calculation of the payment
                var envoy = (principal * (effectiveInterest / (1 - (1 / Math.pow((1 + effectiveInterest), paymentFreqPerYear * (payments / 12)))))).toFixed(2);

                var cumulativeInterest = parseFloat(((envoy * paymentFreqPerYear) * years) - principal);

                var remaining = principal;



                // If the result is a finite number, the user's input was good and
                // we have meaningful results to display
                if (isFinite(envoy)) {
                    // Fill in the output fields, rounding to 2 decimal places

                    tab1yearlyPayment.innerHTML = "$" + (envoy * 12).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab1paymentMonthly.innerHTML = "$" + envoy.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab1total.innerHTML = "$" + (envoy * payments).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab1totalInterest.innerHTML = "$" + cumulativeInterest.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

                    var tab = 'monthlyChartBlock';
                    var oldBalance = principal;
                    var newBalance = principal;
                    var intRate = inputInterest / 12;
                    var monthly = envoy;
                    var owedInterest = 0;
                    var totalInterestPd = 0;
                    var totalPrincipalPd = 0;
                    var numPay = 12;
                    var justInterest = cumulativeInterest;

                    for (var i = 1; i <= numPay; i++) {
                        var loopNum = i;
                        owedInterest = newBalance * intRate;
                        var dispInt = owedInterest;
                        totalInterestPd += owedInterest;


                        // Test for the final payment
                        if (i <= numPay) {
                            monthly = envoy - dispInt;
                            totalPrincipalPd += monthly;
                            oldBalance = newBalance;
                            newBalance = oldBalance - monthly;
                        }
                        else {
                            monthly = (oldBalance - monthly) + owedInterest;
                            oldBalance = newBalance;
                            newBalance = 0;
                            monthly = monthly;
                        }
                    }// end of For

                       if (years == 1) {
                        tab1PrincipalFirst12.innerHTML = "$" + principal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        tab1InterestFirst12.innerHTML = "$" + cumulativeInterest.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    } else {
                        tab1PrincipalFirst12.innerHTML = "$" + totalPrincipalPd.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab1InterestFirst12.innerHTML = "$" + totalInterestPd.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    }

                    
                    chartjs(principal, payments, justInterest, tab);
                    /*tab1PrincipalFirst12.innerHTML = "$" + (principal -(principal * effectiveInterest)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            
                    tab1InterestFirst12.innerHTML = "$" + ((principal) * effectiveInterest).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');*/

                    // Draw Chart
                    //chartjs(principal, payments, cumulativeInterest);
                }
                else {
                    // Result was Not-a-Number or infinite, which means the input was
                    // incomplete or invalid. Clear any previously displayed output.

                    tab1paymentMonthly.innerHTML = "";        // Erase the content of these elements
                    tab1total.innerHTML = ""
                    tab1totalInterest.innerHTML = "";
                    tab1yearlyPayment.innerHTML = "";
                    tab1PrincipalFirst12.innerHTML = "";
                    tab1InterestFirst12.innerHTML = "";

                }

            }

            function calculateQuarterly(principal, inputInterest, years, payments) {
                // Sets the payment frequency per year to 12
                var paymentFreqPerYear = 4;

                // Set the time a year the loan compounds = Anually 
                var compounding = 1;

                // Derived from the effective interest rate provided by Bryant
                var effectiveInterest = Math.pow((1 + (inputInterest / compounding)), (compounding / paymentFreqPerYear)) - 1;
                // Calculation of the payment
                var envoy = principal * (effectiveInterest / (1 - (1 / Math.pow((1 + effectiveInterest), paymentFreqPerYear * (payments / 12)))));

                var cumulativeInterest = parseFloat(((envoy * paymentFreqPerYear) * years) - principal);

                // If the result is a finite number, the user's input was good and
                // we have meaningful results to display
                if (isFinite(envoy)) {

                    tab2Yearly.innerHTML = "$" + (envoy * 4).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab2Quarterly.innerHTML = "$" + envoy.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab2Total.innerHTML = "$" + ((envoy * paymentFreqPerYear) * years).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab2TotalInterest.innerHTML = "$" + cumulativeInterest.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

                    var tab = 'quarterlyChartBlock';
                    var oldBalance = principal;
                    var newBalance = principal;
                    var intRate = inputInterest / 4;
                    var monthly = envoy;
                    var owedInterest = 0;
                    var totalInterestPd = 0;
                    var totalPrincipalPd = 0;
                    var numPay = 4;
                    var justInterest = cumulativeInterest;

                    for (var i = 1; i <= numPay; i++) {
                        var loopNum = i;
                        owedInterest = newBalance * intRate;
                        var dispInt = owedInterest;
                        totalInterestPd += owedInterest;


                        // Test for the final payment
                        if (i <= numPay) {
                            monthly = envoy - dispInt;
                            totalPrincipalPd += monthly;
                            oldBalance = newBalance;
                            newBalance = oldBalance - monthly;
                        }
                        else {
                            monthly = (oldBalance - monthly) + owedInterest;
                            oldBalance = newBalance;
                            newBalance = 0;
                            monthly = monthly;
                        }
                    }// end of For

                    if (years == 1) {
                        tab2PrincipalFirst12.innerHTML = "$" + principal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab2InterestFirst12.innerHTML = "$" + cumulativeInterest.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    } else {
                       tab2PrincipalFirst12.innerHTML = "$" + totalPrincipalPd.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab2InterestFirst12.innerHTML = "$" + totalInterestPd.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    }

                    
                    chartjs(principal, payments, justInterest, tab);
                }
                else {
                    // Result was Not-a-Number or infinite, which means the input was
                    // incomplete or invalid. Clear any previously displayed output.

                    tab2Quarterly.innerHTML = "";        // Erase the content of these elements
                    tab2Total.innerHTML = ""
                    tab2TotalInterest.innerHTML = "";
                    tab2Yearly.innerHTML = "";
                    tab2PrincipalFirst12.innerHTML = "";
                    tab2InterestFirst12.innerHTML = "";

                }
            }

            function calculateSemiAnnually(principal, inputInterest, years, payments) {

                // Sets the payment frequency per year to 12
                var paymentFreqPerYear = 2;

                // Set the time a year the loan compounds = Anually 
                var compounding = 1;

                // Derived from the effective interest rate provided by Bryant
                var effectiveInterest = Math.pow((1 + (inputInterest / compounding)), (compounding / paymentFreqPerYear)) - 1;
                // Calculation of the payment
                var envoy = principal * (effectiveInterest / (1 - (1 / Math.pow((1 + effectiveInterest), paymentFreqPerYear * (payments / 12)))));

                var cumulativeInterest = parseFloat(((envoy * paymentFreqPerYear) * years) - principal);

                // If the result is a finite number, the user's input was good and
                // we have meaningful results to display
                if (isFinite(envoy)) {

                    tab3Yearly.innerHTML = "$" + (envoy * 2).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab3SemiAnnual.innerHTML = "$" + envoy.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab3Total.innerHTML = "$" + ((envoy * paymentFreqPerYear) * years).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab3TotalInterest.innerHTML = "$" + cumulativeInterest.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

                    var tab = 'semiannuallyChartBlock';
                    var oldBalance = principal;
                    var newBalance = principal;
                    var intRate = inputInterest / 2;
                    var monthly = envoy;
                    var owedInterest = 0;
                    var totalInterestPd = 0;
                    var totalPrincipalPd = 0;
                    var numPay = 2;
                    var justInterest = cumulativeInterest;

                    for (var i = 1; i <= numPay; i++) {
                        var loopNum = i;
                        owedInterest = newBalance * intRate;
                        var dispInt = owedInterest;
                        totalInterestPd += owedInterest;


                        // Test for the final payment
                        if (i <= numPay) {
                            monthly = envoy - dispInt;
                            totalPrincipalPd += monthly;
                            oldBalance = newBalance;
                            newBalance = oldBalance - monthly;
                        }
                        else {
                            monthly = (oldBalance - monthly) + owedInterest;
                            oldBalance = newBalance;
                            newBalance = 0;
                            monthly = monthly;
                        }
                    }// end of For


                    if (years == 1) {
                        tab3PrincipalFirst12.innerHTML = "$" + principal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        tab3InterestFirst12.innerHTML = "$" + cumulativeInterest.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    } else {
                        tab3PrincipalFirst12.innerHTML = "$" + totalPrincipalPd.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab3InterestFirst12.innerHTML = "$" + totalInterestPd.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    }
                    
                    chartjs(principal, payments, justInterest, tab);
                }
                else {
                    // Result was Not-a-Number or infinite, which means the input was
                    // incomplete or invalid. Clear any previously displayed output.

                    tab3SemiAnnual.innerHTML = "";        // Erase the content of these elements
                    tab3Total.innerHTML = ""
                    tab3TotalInterest.innerHTML = "";
                    tab3Yearly.innerHTML = "";
                    tab3PrincipalFirst12.innerHTML = "";
                    tab3InterestFirst12.innerHTML = "";

                }

            }

            function calculateAnnually(principal, inputInterest, years, payments) {

                // Sets the payment frequency per year to 12
                var paymentFreqPerYear = 1;

                // Set the time a year the loan compounds = Anually 
                var compounding = 1;

                // Derived from the effective interest rate provided by Bryant
                var effectiveInterest = Math.pow((1 + (inputInterest / compounding)), (compounding / paymentFreqPerYear)) - 1;
                // Calculation of the payment
                var envoy = principal * (effectiveInterest / (1 - (1 / Math.pow((1 + effectiveInterest), paymentFreqPerYear * (payments / 12)))));

                var cumulativeInterest = parseFloat(((envoy * paymentFreqPerYear) * years) - principal);

                var justInterest = cumulativeInterest;
                var tab = 'annuallyChartBlock';

                // If the result is a finite number, the user's input was good and
                // we have meaningful results to display
                if (isFinite(envoy)) {

                    // tab4Yearly.innerHTML = "$" + (envoy).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab4Annually.innerHTML = "$" + envoy.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab4Total.innerHTML = "$" + ((envoy * paymentFreqPerYear) * years).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    tab4TotalInterest.innerHTML = "$" + cumulativeInterest.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

                    if (years == 1) {
                        tab4PrincipalFirst12.innerHTML = "$" + (principal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    } else {
                        tab4PrincipalFirst12.innerHTML = "$" + (principal - (principal * effectiveInterest)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    }
                
                   

                    tab4InterestFirst12.innerHTML = "$" + ((principal) * effectiveInterest).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    chartjs(principal, payments, justInterest, tab);
                }
                else {
                    // Result was Not-a-Number or infinite, which means the input was
                    // incomplete or invalid. Clear any previously displayed output.

                    tab4Annually.innerHTML = "";        // Erase the content of these elements
                    tab4Total.innerHTML = ""
                    tab4TotalInterest.innerHTML = "";
                    tab4PrincipalFirst12.innerHTML = "";
                    tab4InterestFirst12.innerHTML = "";

                }

            }



            // Select your input element.
            var number = document.getElementById('loanAmount');
            var number2 = document.getElementById('inputInterest');

            // Listen for input event on numInput. This block filters out keystrokes not from the 
            // num pad or the upper numbers keys
            number.onkeydown = function (e) {
                if (!((e.keyCode > 95 && e.keyCode < 106)|| (e.keyCode > 47 && e.keyCode < 58)|| e.keyCode == 8 || e.keyCode == 9 )) {
                    return false;
                }
            }

            number2.onkeydown = function (e) {
                if (!((e.keyCode > 95 && e.keyCode < 111)
                    || (e.keyCode > 47 && e.keyCode < 58)
                    || e.keyCode == 8 || e.keyCode == 190 || e.keyCode == 9 )) {
                    return false;
                }
            }

            // caculates the date for the top of the page
            document.getElementById("para1").innerHTML = formatAMPM();

            function formatAMPM() {
                var d = new Date(),
                    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
            }

            // end of $ function
        });
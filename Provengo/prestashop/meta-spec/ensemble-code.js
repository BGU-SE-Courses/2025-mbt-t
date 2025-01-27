// @provengo summon ctrl

/**
 * List of events "of interest" that we want test suites to cover.
 */

// Domain-specific, our own criteria for what makes a good test suite.
const GOALS = [
    Event("End(ApplyCoupon)"), 
    Event("End(ChangeCouponStatusToCanceled)") ,
    Event("End(OpenPromoCodeWindow)") 
];

const makeGoals = function(){
    return [        
    [ Ctrl.markEvent("End(ApplyCoupon)") ], // Add new goal
    [ Ctrl.markEvent("End(ChangeCouponStatusToCanceled)") ] // Add new goal ];
    [ Ctrl.markEvent("End(OpenPromoCodeWindow)") ] // Add new goal ];
    ]
}

// Two-way criteria, all possible pairs of events , the combinations are created in the ranking function.
const twoWayGOALS = [
    Event("Start(CustomerLogin)"), 
    Event("Start(AddProductToCart)") ,
    Event("Start(OpenPromoCodeWindow)"),
    Event("Start(ApplyCoupon)"),
    Event("Start(AdminLogin)"),
    Event("Start(NavigateToCatalogDiscounts)"),
    Event("Start(SelectCouponToCancel)"),
    Event("Start(ChangeCouponStatusToCanceled)")
];

const twoWaymakeGoals= function(){
    return [        
    [ Ctrl.markEvent("Start(CustomerLogin)") ], // Add new goal
    [ Ctrl.markEvent("Start(AddProductToCart)") ] // Add new goal
    [ Ctrl.markEvent("Start(OpenPromoCodeWindow)") ] // Add new goal
    [ Ctrl.markEvent("Start(ApplyCoupon)") ] // Add new goal
    [ Ctrl.markEvent("Start(AdminLogin)") ] // Add new goal
    [ Ctrl.markEvent("Start(NavigateToCatalogDiscounts)") ] // Add new goal
    [ Ctrl.markEvent("Start(SelectCouponToCancel)") ] // Add new goal
    [ Ctrl.markEvent("Start(ChangeCouponStatusToCanceled)") ] // Add new goal

    ]
}

/**
 * Ranks test suites by how many events from the GOALS array were met.
 * The more goals are met, the higher the score.
 * 
 * It make no difference if a goal was met more then once.
 *
 * @param {Event[][]} ensemble The test suite to be ranked.
 * @returns Number of events from GOALS that have been met.
 */
function rankByMetGoals( ensemble ) { // covers domain specific criteria , checks if there are tests that cover the specific goals we defined.
    const unreachedGoals = [];
    for ( let idx=0; idx<GOALS.length; idx++ ) {
        unreachedGoals.push(GOALS[idx]);
    }

    for (let testIdx = 0; testIdx < ensemble.length; testIdx++) {
        let test = ensemble[testIdx];
        for (let eventIdx = 0; eventIdx < test.length; eventIdx++) {
            let event = test[eventIdx];
            for (let ugIdx=unreachedGoals.length-1; ugIdx >=0; ugIdx--) {
                let unreachedGoal = unreachedGoals[ugIdx];
                if ( unreachedGoal.contains(event) ) {
                    unreachedGoals.splice(ugIdx,1);
                }
            }
        }
    }

    return GOALS.length-unreachedGoals.length;
}

function rankByTwoPairCoverage(ensemble) { // covers two way criteria, checks if every 2 event combination is covered by the test suite in both directions.
    // Generate all unique pairs of goals
    const unreachedGoalPairs = [];
    for (let i = 0; i < twoWayGOALS.length; i++) {
        for (let j = i + 1; j < twoWayGOALS.length; j++) {
            unreachedGoalPairs.push([twoWayGOALS[i], twoWayGOALS[j]]);
        }
    }

    // Check each test case for goal pair coverage
    for (let testIdx = 0; testIdx < ensemble.length; testIdx++) {
        let test = ensemble[testIdx];

        // Check each pair of events in the current test case
        for (let eventIdx1 = 0; eventIdx1 < test.length - 1; eventIdx1++) {
            let event1 = test[eventIdx1];
            for (let eventIdx2 = eventIdx1 + 1; eventIdx2 < test.length; eventIdx2++) {
                let event2 = test[eventIdx2];

                // Check if the pair of events satisfies any unreached goal pair
                for (let ugPairIdx = unreachedGoalPairs.length - 1; ugPairIdx >= 0; ugPairIdx--) {
                    let [goal1, goal2] = unreachedGoalPairs[ugPairIdx];
                    if (
                        (goal1.contains(event1) && goal2.contains(event2)) ||
                        (goal1.contains(event2) && goal2.contains(event1))
                    ) {
                        // Remove the satisfied goal pair
                        unreachedGoalPairs.splice(ugPairIdx, 1);
                    }
                }
            }
        }
    }

    // Return the number of covered pairs
    return (twoWayGOALS.length * (twoWayGOALS.length - 1)) - unreachedGoalPairs.length;
}

/**
 * Ranks potential test suites based on the percentage of goals they cover.
 * Goal events are defined in the GOALS array above. An ensemble with rank
 * 100 covers all the goal events.
 *
 * Multiple ranking functions are supported - to change ranking function,
 * use the `ensemble.ranking-function` configuration key, or the 
 * --ranking-function <functionName> command-line parameter.
 *
 * @param {Event[][]} ensemble the test suite/ensemble to be ranked
 * @returns the percentage of goals covered by `ensemble`.
 */
 function rankingFunction(ensemble) {
    
    // How many goals did `ensemble` hit?
    const metGoalsCount = rankByTwoPairCoverage(ensemble);
    // What percentage of the goals did `ensemble` cover?
    const metGoalsPercent = metGoalsCount/(twoWayGOALS.length * (twoWayGOALS.length - 1));

    return metGoalsPercent * 100; // convert to human-readable percentage
}


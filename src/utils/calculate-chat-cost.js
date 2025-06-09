/*
 
    TODO: implement function below based on the jsdoc.
          do not forget about your *HTML/CSS* task
          do not forget to run `npm run test` to check your work,
          otherwise the solution will not be accepted

          (NOTE: do not forget to run `npm install` in the forst place...)
          (NOTE: feel free to introduce new helper functions)
          (NOTE: if you see a buggy test, feel free to fix/report it)

 */
const GPT_4_1 = 'gpt-4-1';
const GPT_4_1_mini = 'gpt-4-1-mini';
const GPT_o3 = 'gpt-o3';

// USD / 1 million tokens
const MODEL_COST_MAP = {
    [GPT_4_1]: {
        input: 2,
        output: 8
    },
    [GPT_4_1_mini]: {
        input: 0.4,
        output: 1.6
    },
    [GPT_o3]: {
        input: 10,
        output: 40
    }
};

const ONE_USD = 355.63; // HUF

/**
 * Calculates token costs in USD or HUF.
 * 
 * Cost is calculated based on either the prompt, completion or total tokens, based on the parameters.
 * The funciton accepts 3 types of models, for each see the constants above. For the currency change
 * the function considers the {ONE_USD} constant above.
 * 
 * If there is an unknown model in the conversation, a `warning` is made to the console (e.g. "Unknown model")
 * and it's counted as `0`.
 * 
 * If the conversation is empty, the cost is 0 in both currencies
 * 
 *  @param conversation array of chat responses such as
 * {
 *   "created": 1677858242,
 *   "model": "gpt-4-1",
 *   "usage": {
 *       "prompt_tokens": 13,
 *       "completion_tokens": 7,
 *       "total_tokens": 20
 *   },
 *   "choices": [ ...  ]
 * }
 * @param params {
 *  currency: 'USD' | 'HUF'
 *  count: 'prompt' | 'completion' | 'total'
 * }
 *
 * @return
 *  * string representation of the cost of the chat with max. 6 decimal points (e.g. "0.000435 USD")
 *  * if the currency is invalid the returned value is `N/A`
 *  * if the tokens to be counted are not from the enum the returned value is `N/A`
 */
export function calculateChatCost(conversation, params) 
{
    const { currency, count } = params;

    if (!['USD', 'HUF'].includes(currency)) return 'N/A';
    if (!['prompt', 'completion', 'total'].includes(count)) return 'N/A';

    let totalCostUSD = 0;

    for (const item of conversation) 
        {
        const model = item.model;
        const usage = item.usage;

        const modelCosts = MODEL_COST_MAP[model];
        if (!modelCosts) 
        {
            console.warn('Unknown model');
            continue;
        }

        let cost = 0;
        if (count === 'prompt') 
        {
            cost = usage.prompt_tokens * modelCosts.input / 1_000_000;
        } 
        else if (count === 'completion') 
        {
            cost = usage.completion_tokens * modelCosts.output / 1_000_000;
        } 
        else if (count === 'total') 
            {
            cost = 
            (
                usage.prompt_tokens * modelCosts.input +
                usage.completion_tokens * modelCosts.output
            ) / 1_000_000;
        }

        totalCostUSD += cost;
    }

    let result = totalCostUSD;
    if (currency === 'HUF') 
    {
        result *= ONE_USD;
    }

    // === FORMÁZÁS MEGOLDÁSA ===
    // ha egész, ne legyen tizedes:
    if (Number.isInteger(result)) 
        {
        return `${result} ${currency}`;
    }

    // ha nem egész, de felesleges 0-k vannak a végén: vágjuk le
    return `${parseFloat(result.toFixed(6))} ${currency}`;
}

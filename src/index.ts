// src/index.ts
/**
 * Main entry point for InflationControl
 */

import { InflationControl } from './inflationcontrol';
import minimist from 'minimist';

// Define the command-line argument interface
interface Args {
    /**
     * Enable verbose mode for detailed logging
     */
    verbose?: boolean;
    /**
     * Path to the input file
     */
    input?: string;
    /**
     * Path to the output file
     */
    output?: string;
}

// Parse command-line arguments
const args: Args = minimist(process.argv.slice(2), {
    boolean: ['verbose'],
    alias: {
        v: 'verbose',
        i: 'input',
        o: 'output'
    }
});

/**
 * Main application entry point
 */
async function main(): Promise<void> {
    try {
        // Initialize the InflationControl application
        const app = new InflationControl({
            verbose: args.verbose || false
        });

        if (args.verbose) {
            console.log('Starting InflationControl processing...');
        }

        // Execute the application
        const result = await app.execute();

        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        console.log('Processing completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

// Run the application if this script is the entry point
if (require.main === module) {
    main();
}
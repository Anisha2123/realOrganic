// Frontend environment validation script
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const requiredEnvVars = [
    'VITE_API_URL',
    'VITE_RAZORPAY_KEY_ID',
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
];

const optionalEnvVars = [
    'VITE_FIREBASE_MEASUREMENT_ID'
];

function validateEnvironment() {
    console.log('🔍 Validating frontend environment variables...\n');
    
    let hasErrors = false;
    
    // Check required variables
    console.log('Required variables:');
    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            console.error(`❌ ${varName} is not set`);
            hasErrors = true;
        } else {
            console.log(`✅ ${varName} is set`);
        }
    });
    
    // Check optional variables
    console.log('\nOptional variables:');
    optionalEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            console.warn(`⚠️  ${varName} is not set (optional)`);
        } else {
            console.log(`✅ ${varName} is set`);
        }
    });
    
    // Validate specific formats
    console.log('\nValidation checks:');
    
    if (process.env.VITE_API_URL && !process.env.VITE_API_URL.startsWith('http')) {
        console.error('❌ VITE_API_URL should start with "http://" or "https://"');
        hasErrors = true;
    } else if (process.env.VITE_API_URL) {
        console.log('✅ VITE_API_URL format looks correct');
        
        if (process.env.NODE_ENV === 'production' && process.env.VITE_API_URL.startsWith('http://')) {
            console.warn('⚠️  Consider using HTTPS in production');
        }
    }
    
    if (process.env.VITE_RAZORPAY_KEY_ID) {
        if (process.env.NODE_ENV === 'production' && !process.env.VITE_RAZORPAY_KEY_ID.startsWith('rzp_live_')) {
            console.warn('⚠️  Using test Razorpay key in production environment');
        } else {
            console.log('✅ Razorpay key format looks correct');
        }
    }
    
    console.log('\n' + '='.repeat(50));
    
    if (hasErrors) {
        console.error('\n❌ Environment validation failed. Please fix the errors above.');
        process.exit(1);
    } else {
        console.log('\n✅ Environment validation passed!');
        console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
    }
}

validateEnvironment();

// Environment validation script
const requiredEnvVars = [
    'MONGO_URI',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'RAZORPAY_WEBHOOK_SECRET',
    'JWT_SECRET'
];

const optionalEnvVars = [
    'PORT',
    'NODE_ENV',
    'CORS_ORIGIN',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USER',
    'EMAIL_PASSWORD'
];

function validateEnvironment() {
    console.log('🔍 Validating environment variables...\n');
    
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
    
    if (process.env.MONGO_URI && !process.env.MONGO_URI.startsWith('mongodb')) {
        console.error('❌ MONGO_URI should start with "mongodb://" or "mongodb+srv://"');
        hasErrors = true;
    } else if (process.env.MONGO_URI) {
        console.log('✅ MONGO_URI format looks correct');
    }
    
    if (process.env.RAZORPAY_KEY_ID) {
        if (process.env.NODE_ENV === 'production' && !process.env.RAZORPAY_KEY_ID.startsWith('rzp_live_')) {
            console.warn('⚠️  Using test Razorpay key in production environment');
        } else {
            console.log('✅ Razorpay key format looks correct');
        }
    }
    
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
        console.warn('⚠️  JWT_SECRET should be at least 32 characters long');
    } else if (process.env.JWT_SECRET) {
        console.log('✅ JWT_SECRET length is adequate');
    }
    
    console.log('\n' + '='.repeat(50));
    
    if (hasErrors) {
        console.error('\n❌ Environment validation failed. Please fix the errors above.');
        process.exit(1);
    } else {
        console.log('\n✅ Environment validation passed!');
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Port: ${process.env.PORT || 5000}`);
    }
}

module.exports = validateEnvironment;

// Run validation if called directly
if (require.main === module) {
    require('dotenv').config();
    validateEnvironment();
}

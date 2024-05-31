module.exports = {
    apps: [
        {
            name: 'lvis-system',
            script: './scripts/start_system.sh',
            cwd: __dirname, // Set the correct path
            wait_ready: true, // Wait for the ready signal
            listen_timeout: 10000, // 10 seconds to wait for the ready signal
        },
        {
            name: 'lvis-warehouse',
            script: './scripts/start_warehouse.sh',
            cwd: __dirname, // Set the correct path
            wait_ready: true, // Wait for the ready signal
            listen_timeout: 10000, // 10 seconds to wait for the ready signal
        },
        {
            name: 'lvis-api-gateway',
            script: './scripts/start_api_gateway.sh',
            cwd: __dirname, // Set the correct path
            wait_ready: true, // Wait for the ready signal
            listen_timeout: 10000, // 10 seconds to wait for the ready signal
            env: {
                PM2_SERVE_WAIT: 'system,warehouse' // Ensure it starts after system and warehouse
            }
        }
    ]
};

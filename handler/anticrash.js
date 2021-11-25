module.exports = async (client) => {
    process.on('unhandledRejection', (reason, p) => {
        console.log(' [ANTICRASH] <==> || Unhandled Rejection/Catch || <==> [ANTICRASH]');
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [ANTICRASH] <==> || Uncaught Exception/Catch || <==> [ANTICRASH]');
        console.log(err, origin);
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [ANTICRASH] <==>  || Uncaught Exception/Catch (MONITOR) || <==> [ANTICRASH]');
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [ANTICRASH] <==> || Multiple Resolves || <==> [ANTICRASH]');
        console.log(type, promise, reason);
    });
}
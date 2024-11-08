import { Effect, LogLevel, Logger } from 'effect';

export function withLogger(program: Effect.Effect<unknown>) {
  const logger = Logger.make(({ logLevel, message }) => {
    const _args = Array.isArray(message) ? message : [message];
    if (logLevel === LogLevel.Info) {
    } else if (logLevel === LogLevel.Debug) {
    } else if (logLevel === LogLevel.Error) {
    } else if (logLevel === LogLevel.Warning) {
    } else {
    }
  });
  const layer = Logger.replace(Logger.defaultLogger, logger);
  const logLevel =
    process.env.SYNOPKG_VERBOSE === 'true'
      ? LogLevel.Debug
      : process.env.NODE_ENV === 'test'
        ? LogLevel.None
        : LogLevel.Info;
  return Effect.provide(Logger.withMinimumLogLevel(program, logLevel), layer);
}

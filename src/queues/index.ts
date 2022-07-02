import LogQueue from "./log.queue";
import EmailQueue from "./email.queue";

const queues = {
    log: LogQueue.getInstance().queue,
    email: EmailQueue.getInstance().queue,

}
export default queues;

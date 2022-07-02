import LogQueue from "./log.queue";
import EmailQueue from "./email.queue"
import CandidateQueue from "./candidate.queue"

const queues = {
    log: LogQueue.getInstance().queue,
    email: EmailQueue.getInstance().queue,
    candidate: CandidateQueue.getInstance().queue,

}
export default queues;

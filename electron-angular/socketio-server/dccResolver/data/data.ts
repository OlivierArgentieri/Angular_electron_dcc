import { MessagePort } from 'worker_threads';
 
export default interface Data {
  port: MessagePort;
  value: number;
}
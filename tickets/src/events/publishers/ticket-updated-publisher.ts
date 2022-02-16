import { Publisher, Subjects, TicketUpdatedEvent } from '@toyosi-organiza/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}
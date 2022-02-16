import { Publisher, Subjects, TicketCreatedEvent } from '@toyosi-organiza/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}
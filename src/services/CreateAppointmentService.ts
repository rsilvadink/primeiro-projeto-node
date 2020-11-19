import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointementsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointementsRepository;

  constructor(appointmentRepository: AppointementsRepository) {
    this.appointmentsRepository = appointmentRepository;
  }

  public excecute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('Horário já foi reservado.');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;

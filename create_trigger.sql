DELIMITER //
CREATE TRIGGER limit_doctor_appointments
BEFORE INSERT ON appointments
FOR EACH ROW
BEGIN
    DECLARE appointment_count INT;

    SELECT COUNT(*)
    INTO appointment_count
    FROM appointments
    WHERE doctor = NEW.doctor
    AND DATE(createdAt) = DATE(NEW.createdAt);

    IF appointment_count >= 2 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Doctor already has 2 appointments for this day';
    END IF;
END;
//
DELIMITER ;

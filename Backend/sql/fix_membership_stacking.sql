-- Fix membership stacking to continue from previous membership end date
-- Drop and recreate the purchase_membership procedure

USE Fitness_DB;

DROP PROCEDURE IF EXISTS purchase_membership;

DELIMITER $$

CREATE PROCEDURE purchase_membership(
    IN p_user_id CHAR(36),
    IN p_plan_id CHAR(36),
    IN p_start DATE,
    IN p_amount DECIMAL(10,2),
    IN p_payment_method VARCHAR(50),
    OUT p_membership_id CHAR(36),
    OUT p_payment_id CHAR(36)
)
BEGIN
    DECLARE v_duration INT;
    DECLARE v_end DATE;
    DECLARE v_actual_start DATE;
    DECLARE v_latest_end_date DATE;
    
    -- Get plan duration
    SELECT duration_months INTO v_duration FROM membership_plans WHERE id = p_plan_id;
    
    -- Check if user has any existing memberships (active or future)
    -- Find the latest end_date from their memberships
    SELECT MAX(end_date) INTO v_latest_end_date
    FROM memberships
    WHERE user_id = p_user_id
      AND status IN ('active', 'pending')
      AND end_date >= CURDATE();
    
    -- If there's an existing membership that hasn't expired yet, stack from its end date
    -- Otherwise, start from current date or provided start date
    IF v_latest_end_date IS NOT NULL AND v_latest_end_date >= CURDATE() THEN
        SET v_actual_start = DATE_ADD(v_latest_end_date, INTERVAL 1 DAY);
    ELSE
        SET v_actual_start = p_start;
    END IF;
    
    SET v_end = DATE_ADD(v_actual_start, INTERVAL v_duration MONTH);
    
    -- Generate IDs
    SET p_membership_id = UUID();
    SET p_payment_id = UUID();
    
    -- Create membership
    INSERT INTO memberships (id, user_id, start_date, end_date, status, membership_plan_id)
    VALUES (p_membership_id, p_user_id, v_actual_start, v_end, 'pending', p_plan_id);
    
    -- Create payment
    INSERT INTO payments (id, user_id, membership_id, amount, payment_method, status)
    VALUES (p_payment_id, p_user_id, p_membership_id, p_amount, p_payment_method, 'pending');
END$$

DELIMITER ;

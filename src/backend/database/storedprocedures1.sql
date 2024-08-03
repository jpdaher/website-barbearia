DELIMITER $$

CREATE PROCEDURE adicionar_cliente (
    IN p_nome VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_senha VARCHAR(100)
)
BEGIN
    INSERT INTO clientes (nome, email, senha)
    VALUES (p_nome, p_email, p_senha);    
END $$

CREATE PROCEDURE get_registros (
)
BEGIN
	SELECT idclientes, email, senha
    FROM clientes;
END $$

CREATE PROCEDURE get_barbeiros (
)
BEGIN
	SELECT * FROM barbeiros;
END $$

CREATE PROCEDURE get_especialidades (
	IN p_idbarbeiros INT
)
BEGIN 
	SELECT b.idbarbeiros AS id, b.nome AS barbeiro, e.idespecialidades AS id_especialidade, e.nome AS especialidade
    FROM barbeiros b
    INNER JOIN barbeiros_especialidades USING (idbarbeiros)
    INNER JOIN especialidades USING (idespecialidades);
END $$

CREATE PROCEDURE adicionar_barbeiro (
    IN p_nome VARCHAR(100),
    IN p_data_nasc DATE,
    IN p_data_contrat DATE
)
BEGIN
    INSERT INTO barbeiros (nome, data_nasc, data_contrat)
    VALUES (p_nome, p_data_nasc, p_data_contrat);
END $$

CREATE PROCEDURE adicionar_especialidade (
	IN p_idbarbeiros INT,
    IN p_idespecialidades INT
)
BEGIN
	IF NOT EXISTS (
		SELECT * FROM barbeiros_especialidades
        WHERE idbarbeiros = p_idbarbeiros AND idespecialidades = p_idespecialidades
    ) THEN
		INSERT INTO barbeiros_especialidades (idbarbeiros, idespecialidades)
        VALUES (p_idbarbeiros, p_idespecialidades);
	END IF;
END $$

CREATE PROCEDURE adicionar_agendamento (
    IN p_idclientes INT,
    IN p_idbarbeiros INT,
    IN p_data DATE,
    IN p_horario TIME
)
BEGIN
    INSERT INTO agendamentos (idclientes, idbarbeiros, data, horario)
    VALUES (p_idclientes, p_idbarbeiros, p_data, p_horario);
END $$

CREATE PROCEDURE get_agendamentos (
    IN p_data DATE
)
BEGIN
    SELECT * FROM agendamentos WHERE data = p_data;
END $$

CREATE PROCEDURE cancelar_agendamento (
	IN p_idagendamentos INT
)
BEGIN
	DELETE FROM agendamentos WHERE idagendamentos = p_idagendamentos;
END $$

DELIMITER ;
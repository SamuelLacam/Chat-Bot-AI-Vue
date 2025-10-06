CREATE DATABASE gizelle;

USE gizelle;

CREATE TABLE user
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  login VARCHAR(25) UNIQUE NOT NULL,
  password VARCHAR(25) NOT NULL
);

CREATE TABLE conversation (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

CREATE TABLE message (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  conversation_id INT NOT NULL,
  role ENUM('user', 'assistant', 'system') NOT NULL,
  content LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversation(id) ON DELETE CASCADE,
  INDEX idx_conversation_id (conversation_id)
);

-- User Test
INSERT INTO user (login, password) VALUES ('tkt@tkt.tkt', 'a');


-- CREATE USER 'myapp'@'%' IDENTIFIED BY '';
-- GRANT ALL PRIVILEGES ON gizelle.* TO 'myapp'@'%';
-- FLUSH PRIVILEGES;
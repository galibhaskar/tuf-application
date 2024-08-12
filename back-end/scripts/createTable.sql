CREATE TABLE IF NOT EXISTS banner (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  timer INT NOT NULL,
  link TEXT NOT NULL,
  visible BOOLEAN NOT NULL,
  visible_datetime TIMESTAMP NOT NULL
);
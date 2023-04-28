-- This is an empty migration.

-- prisma/migrations/<timestamp>_add_direct_messages_trigger.up.sql

CREATE OR REPLACE FUNCTION send_direct_message()
RETURNS TRIGGER AS $$
DECLARE
  client text;
BEGIN
  -- Get the receiver's client ID from the users table
  SELECT client_id INTO client
  FROM "User"
  WHERE id = NEW."receiverId";

  -- Send the message to the receiver's client using Prism
  PERFORM PRISM.send(client, NEW.text);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER direct_messages_trigger
AFTER INSERT ON "DirectMessages"
FOR EACH ROW
EXECUTE FUNCTION send_direct_message();

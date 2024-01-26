import sqlite3, os
from datetime import datetime
class DatabaseManager:
    
    def connect_to_database():
        """Connect to the SQLite database. If it doesn't exist, create it."""
        database_name = 'dataBaseQAWriteGeniusAI.db'
        if not os.path.exists(database_name):
            conn = sqlite3.connect(database_name)
            cursor = conn.cursor()

            cursor.execute('''
                CREATE TABLE IF NOT EXISTS QA_Write_Genius_AI (
                    ID INTEGER PRIMARY KEY,
                    DATE_REQUEST DATETIME,
                    TEXT_ORIGINAL TEXT,
                    SUGGESTION TEXT,
                    OPINION TEXT,
                    WORDS_DIFFERENCE INTEGER,
                    FEEDBACK TEXT,
                    IDENTIFICATION TEXT,
                    OBSERVATION TEXT
                )
            ''')
            
            conn.commit()
            conn.close()

        return sqlite3.connect(database_name)

    def IfNullFill():
        """Check if the table is empty. If so, insert example data."""
        conn = DatabaseManager.connect_to_database()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM QA_Write_Genius_AI")

        row_count = cursor.fetchone()[0]

        if row_count == 0:
            example_data = {
                'TEXT_ORIGINAL': 'Example of text original, user-written',
                'SUGGESTION': 'Suggestion for the original text',
                'OPINION': 'Opinion about the original text',
                'WORDS_DIFFERENCE': 10,
                'FEEDBACK': 'Feedback about the suggestion',
                'IDENTIFICATION': 'Author identification',
                'OBSERVATION': 'Free observation'
            }

            DatabaseManager.DataBaseInsert(example_data)

    def CheckRecordExists(text_original, identification):
        """
        Check if a record exists for the given TEXT_ORIGINAL and IDENTIFICATION.

        Parameters:
        - text_original (str): The original text to search for.
        - identification (str): The value of the IDENTIFICATION field.

        Returns:
        - bool: True if a record exists, False otherwise.
        """
        conn = DatabaseManager.connect_to_database()
        cursor = conn.cursor()
        select_command = '''
            SELECT 1
            FROM QA_Write_Genius_AI
            WHERE TEXT_ORIGINAL = ? AND IDENTIFICATION = ?
            LIMIT 1
        '''
        cursor.execute(select_command, (text_original, identification))
        result = cursor.fetchone()

        conn.close()

        return bool(result)


    def UpdateFieldWithIdentificationAndLastRecord(text_original, userIdCookie, field_to_update, new_value):
        """
        Update a specific field for the last occurrence of a specific TEXT_ORIGINAL and IDENTIFICATION.

        Parameters:
        - text_original (str): The original text to search for.
        - identification (str): The value of the userIdCookie field.
        - field_to_update (str): The name of the field to update.
        - new_value: The new value to set for the specified field.
        """
        conn = DatabaseManager.connect_to_database()
        cursor = conn.cursor()
        select_command = f'''
            SELECT * FROM QA_Write_Genius_AI
            WHERE TEXT_ORIGINAL = ? AND IDENTIFICATION = ?
            ORDER BY DATE_REQUEST DESC
            LIMIT 1
        '''

        cursor.execute(select_command, (text_original, userIdCookie))
        result = cursor.fetchone()

        if result:
            update_command = f'''
                UPDATE QA_Write_Genius_AI
                SET {field_to_update} = ?
                WHERE TEXT_ORIGINAL = ? AND IDENTIFICATION = ?
            '''

            cursor.execute(update_command, (new_value, text_original, userIdCookie))
            
            conn.commit()
            conn.close()

            print(f"{field_to_update} updated for the last occurrence of '{text_original}' with IDENTIFICATION '{userIdCookie}'.")

        else:
            print(f"No records found for '{text_original}' with IDENTIFICATION '{userIdCookie}'.")


    def UpdateField(text_original, field_to_update, new_value):
        """
        Update a specific field for all occurrences of a specific TEXT_ORIGINAL.

        Parameters:
        - text_original (str): The original text to search for.
        - field_to_update (str): The name of the field to update.
        - new_value: The new value to set for the specified field.
        """
        conn = DatabaseManager.connect_to_database()
        cursor = conn.cursor()
        select_command = f'''
            SELECT * FROM QA_Write_Genius_AI
            WHERE TEXT_ORIGINAL = ?
        '''

        cursor.execute(select_command, (text_original,))
        results = cursor.fetchall()

        if results:
            update_command = f'''
                UPDATE QA_Write_Genius_AI
                SET {field_to_update} = ?
                WHERE TEXT_ORIGINAL = ?
            '''

            for result in results:
                cursor.execute(update_command, (new_value, text_original))
            
            conn.commit()
            conn.close()

            print(f"{field_to_update} updated for {len(results)} occurrences of '{text_original}'.")

        else:
            print(f"No records found for '{text_original}'.")

    def DataBaseInsert(data):
        """Insert data into the QA_Write_Genius_AI table."""
        
        conn = DatabaseManager.connect_to_database()
        cursor = conn.cursor()

        comando_insert = '''
            INSERT INTO QA_Write_Genius_AI (
                DATE_REQUEST,
                TEXT_ORIGINAL,
                SUGGESTION,
                OPINION,
                WORDS_DIFFERENCE,
                FEEDBACK,
                IDENTIFICATION,
                OBSERVATION
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        '''
        # Verifica se os valores estão presentes e substitui por NULL se não estiverem
        values = (
            datetime.now(),
            data.get('TEXT_ORIGINAL', None),
            data.get('SUGGESTION', None),
            data.get('OPINION', None),
            data.get('WORDS_DIFFERENCE', None),
            data.get('FEEDBACK', None),
            data.get('IDENTIFICATION', None),
            data.get('OBSERVATION', None)
        )

        cursor.execute(comando_insert, values)
        conn.commit()
        conn.close()

# Main
DatabaseManager.connect_to_database()
DatabaseManager.IfNullFill()
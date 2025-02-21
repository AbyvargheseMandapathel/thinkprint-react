import pandas as pd
import json

# Input and output file names
input_excel = "Products_json.xlsx"  # Change this to your actual file
output_json = "output.json"

# Function to convert Excel to JSON
def excel_to_json(input_file, output_file, start_id=9):
    # Read Excel file and check actual column names
    df = pd.read_excel(input_file, header=0)  # Ensure first row is header
    df.columns = df.columns.str.strip()  # Remove extra spaces from column names

    print("Columns found in Excel:", list(df.columns))  # Debugging step

    # Check if the required column exists
    required_columns = ["Product", "Short Description", "Long Description", "Category", "Design Specification"]
    missing_columns = [col for col in required_columns if col not in df.columns]

    if missing_columns:
        raise KeyError(f"Missing columns in Excel file: {missing_columns}")

    data_list = []

    for idx, row in df.iterrows():
        product_data = {
            "id": start_id + idx,  # Start ID from 9
            "title": row["Product"].strip(),
            "shortDescription": row["Short Description"].strip(),
            "longDescription": row["Long Description"].strip(),
            "price": 399,  # Placeholder value, update if needed
            "ratingCount": 130,  # Placeholder value
            "category": row["Category"].strip(),
            "img": f"https://picsum.photos/300/300?random={start_id + idx}",
            "designSpecifications": [spec.strip() for spec in str(row["Design Specification"]).split(",") if spec.strip()],
            "thumbnailImages": [
                f"https://picsum.photos/300/300?random={start_id + idx}-1",
                f"https://picsum.photos/300/300?random={start_id + idx}-2",
                f"https://picsum.photos/300/300?random={start_id + idx}-3"
            ]
        }
        data_list.append(product_data)

    # Save as JSON file
    with open(output_file, mode='w', encoding='utf-8') as json_file:
        json.dump(data_list, json_file, indent=4, ensure_ascii=False)

    print(f"JSON file '{output_file}' created successfully!")

# Run the script
excel_to_json(input_excel, output_json)

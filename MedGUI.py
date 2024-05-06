import tkinter as tk
from tkinter import ttk, messagebox
import pandas as pd

def load_data(filepath):
    try:
        return pd.read_excel(filepath)
    except Exception as e:
        messagebox.showerror("Error", f"Failed to load data: {e}")
        return None

def find_matching_schools(gpa, mcat, data):
    try:
        data['MCAT_diff'] = abs(data['MCAT'] - mcat)
        data['GPA_diff'] = abs(data['GPA'] - gpa)
        return data[(data['MCAT_diff'] <= 2) & (data['GPA_diff'] <= 0.1)]
    except KeyError as e:
        messagebox.showerror("Error", f"Data missing expected columns: {e}")
        return pd.DataFrame()

def on_submit():
    gpa = float(gpa_entry.get())
    mcat = int(mcat_entry.get())
    matching_schools = find_matching_schools(gpa, mcat, data)
    for i in tree.get_children():
        tree.delete(i)
    for index, row in matching_schools.iterrows():
        tree.insert("", 'end', values=list(row))

# Load data
data = load_data('/Users/utsavsharma/Desktop/MSAR/book1 (1).xlsx')

# Set up the GUI
root = tk.Tk()
root.title("School Matcher")

tk.Label(root, text="Enter your GPA:").grid(row=0, column=0)
gpa_entry = tk.Entry(root)
gpa_entry.grid(row=0, column=1)

tk.Label(root, text="Enter your MCAT score:").grid(row=1, column=0)
mcat_entry = tk.Entry(root)
mcat_entry.grid(row=1, column=1)

submit_button = tk.Button(root, text="Find Matching Schools", command=on_submit)
submit_button.grid(row=2, column=0, columnspan=2)

# TreeView for displaying data
columns = ('Name', 'City', 'State', 'MCAT', 'GPA', 'Degree', 'Class Size', 'In-state', 'Out-State')
tree = ttk.Treeview(root, columns=columns, show='headings')
for col in columns:
    tree.heading(col, text=col)
    tree.column(col, width=120)  # Adjust column widths as needed
tree.grid(row=3, column=0, columnspan=2, sticky='nsew')

# Scrollbars
vsb = ttk.Scrollbar(root, orient="vertical", command=tree.yview)
vsb.grid(row=3, column=2, sticky='ns')
tree.configure(yscrollcommand=vsb.set)

hsb = ttk.Scrollbar(root, orient="horizontal", command=tree.xview)
hsb.grid(row=4, column=0, columnspan=2, sticky='ew')
tree.configure(xscrollcommand=hsb.set)

root.mainloop()





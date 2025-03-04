exports.submitItem = async (req, res) => {
    const itemData = req.body;
  
    try {
      // Save item data to the database
      // Example: await Item.create(itemData);
      res.status(201).json({ message: "Item listed successfully!", data: itemData });
    } catch (err) {
      console.error("Error submitting item:", err);
      res.status(500).json({ error: "Failed to submit item" });
    }
  };
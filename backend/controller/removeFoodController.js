import foodItemModel from './path/to/your/foodItemModel'; // Adjust the path to your actual model file

// Function to remove a food item by its ID
const removeFoodItem = async (id) => {
  try {
    const result = await foodItemModel.findByIdAndRemove(id);
    return result;
  } catch (error) {
    console.error('Error removing food item:', error);
    throw error;
  }
};

const foodItemId = '';
removeFoodItem(foodItemId)
  .then(result => {
    console.log('Removed food item:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });

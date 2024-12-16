// import ServiceList from '../models/serviceListModel.js';

// // Fetch all services
// const getAllServicesList = async (req, res) => {
//   try {
//     const services = await ServiceList.find();
//     res.status(200).json(services);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to retrieve services", error: error.message });
//   }
// };

// // Fetch a single service by ID
// const getServiceListById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find the service by ID
//     const service = await ServiceList.findById(id);

//     if (!service) {
//       return res.status(404).json({ message: "Service not found" });
//     }

//     res.status(200).json(service);
//   } catch (error) {
//     console.error("Error fetching service by ID:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Create a new service
// const createServiceList = async (req, res) => {
//   const { name, description, price, icon } = req.body;

//   try {
//     const newServiceList = new ServiceList({
//       name,
//       description,
//       price,
//       icon,
//     });

//     await newServiceList.save();
//     res.status(201).json(newServiceList);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to create service", error: error.message });
//   }
// };

// // Update an existing service
// const updateServiceList = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, icon } = req.body;

//   try {
//     const updatedServiceList = await ServiceList.findByIdAndUpdate(
//       id,
//       { name, description, price, icon },
//       { new: true }
//     );

//     if (!updatedServiceList) {
//       return res.status(404).json({ message: "Service not found" });
//     }

//     res.status(200).json(updatedServiceList);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to update service", error: error.message });
//   }
// };

// // Delete a service
// const deleteServiceList = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedServiceList = await ServiceList.findByIdAndDelete(id);

//     if (!deletedServiceList) {
//       return res.status(404).json({ message: "Service not found" });
//     }

//     res.status(200).json({ message: "Service deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete service", error: error.message });
//   }
// };

// export { getAllServicesList, getServiceListById, createServiceList, updateServiceList, deleteServiceList };

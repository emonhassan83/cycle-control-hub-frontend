const bikeManagementPaths = [
    {
      name: "Dashboard",
      path: "dashboard",
      element: "<BikeManagementDashboard />",
    },
    {
      name: "Bike Management",
      children: [
          {
              name: "Add a bike",
              path: "add-a-bike",
              element: "<AddABike />",
            },
            {
              name: "View bikes",
              path: "view-bikes",
              element: "<ViewMyBikes />",
            },
            {
              name: "Sales History",
              path: "sales-history",
              element: "<SalesHistory />",
            }
      ]
    },
  ];


  const newArray = bikeManagementPaths?.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  if (item.children) {
    item.children.forEach((child) => {
        acc.push({
            path: child.path,
            element: child.element,
          });
    })
  }

  return acc;
}, []);

console.log(newArray);
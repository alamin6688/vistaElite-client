import Container from "../Container/Container.jsx";
import { categories } from "./CategoriesData.js";
import CategoryBox from "./CategoryBox.jsx";


const Categories = () => {
  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;

import { EntityRepository, Repository } from "typeorm";
import { Category } from "src/Entity/category.entity";
import { CategoryDto } from "src/DTO/category.dto";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

    // 카테고리 업로드
    async uploadCategory(categoryDto: CategoryDto): Promise<Category> {
        const { name, downloadDistribution } = categoryDto;

        const category = this.create({
            name,
            downloadDistribution,
        })

        await this.save(category);

        return category;
    }
}
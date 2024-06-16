import { useAppSelector } from "@/app/appStore";
import { useGetCategoriesQuery } from "@/entities/category/api/categoriesApi";
import { NewsFilters } from "@/widgets/news";
import NewsListWithPagination from "../NewsListWithPagination/NewsListWithPagination";
import styles from './styles.module.css'

const NewsByFilters = () => {

    const filters = useAppSelector((state) => state.news.filters);

    const { data } = useGetCategoriesQuery(null);

    return (
        <section className={styles.section}> 

            <NewsFilters filters={filters} categories={data?.categories || []}/>

            <NewsListWithPagination filters={filters}/>

        </section>
    )
}

export default NewsByFilters 
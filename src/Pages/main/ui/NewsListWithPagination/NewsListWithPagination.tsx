import { TOTAL_PAGES } from "@/shared/constant/constant";
import { IFilters } from "@/shared/interfaces";
import { NewsList } from "@/widgets/news";
import { usePaginationNews } from "../../utils/hooks/usePaginationNews";
import { Pagination } from "@/features/pagination";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useGetNewsQuery } from "@/entities/news/api/newsApi";

interface Props {
    filters: IFilters;
}

const NewsListWithPagination = ({filters}: Props) => {

    const debouncedKeywords=useDebounce(filters.keywords, 1500);

    const { data, isLoading } = useGetNewsQuery({
        ...filters,
        keywords: debouncedKeywords,
    });

    const {handleNextPage, handlePreviousPage, handlePageClick} = usePaginationNews(filters);

    return (
            <Pagination
                top
                bottom 
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
                totalPages={TOTAL_PAGES}
                currentPage={filters.page_number}
            >
                <NewsList
                    direction="column"
                    type="item"
                    isLoading={isLoading} 
                    news={data && data.news}
                />
            </Pagination>
    )
}

export default NewsListWithPagination
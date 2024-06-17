import { TOTAL_PAGES } from "@/shared/constant/constant";
import { IFilters } from "@/shared/interfaces";
import { NewsList } from "@/widgets/news";
import { usePaginationNews } from "../../utils/hooks/usePaginationNews";
import { Pagination } from "@/features/pagination";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useGetNewsQuery } from "@/entities/news/api/newsApi";
import { useAppDispatch } from "@/app/appStore";
import { INews } from "@/entities/news";
import { setCurrentNews } from "@/entities/news/model/newsSlices";
import { useNavigate } from "react-router-dom";

interface Props {
    filters: IFilters;
}

const NewsListWithPagination = ({filters}: Props) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const navigateTo = (news: INews) => {
        dispatch(setCurrentNews(news));
        navigate(`/news/${news.id}`);   
    }

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
                    viewNewsSlot={(news: INews) => <p style={{color: "#6b4eff", cursor: "pointer"}} onClick={() => navigateTo(news)}>view more...</p>}
                />
            </Pagination>
    )
}

export default NewsListWithPagination
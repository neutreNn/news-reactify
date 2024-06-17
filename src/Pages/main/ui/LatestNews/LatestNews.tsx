﻿import { useGetLatestNewsQuery } from '@/entities/news/api/newsApi';
import { NewsList } from '@/widgets/news';
import styles from './styles.module.css'
import { INews } from '@/entities/news';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/appStore';
import { setCurrentNews } from '@/entities/news/model/newsSlices';

const LatestNews = () => {

    const { data, isLoading } = useGetLatestNewsQuery(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const navigateTo = (news: INews) => {
        dispatch(setCurrentNews(news));
        navigate(`/news/${news.id}`);   
    }


    return (
        <section className={styles.section}> 
            <NewsList
                type="banner" 
                direction="row" 
                news={data && data.news} 
                isLoading={isLoading} 
                viewNewsSlot={(news: INews) => <p style={{color: "#6b4eff", cursor: "pointer"}} onClick={() => navigateTo(news)}>view more...</p>}
            />
        </section>
    );
};

export default LatestNews;
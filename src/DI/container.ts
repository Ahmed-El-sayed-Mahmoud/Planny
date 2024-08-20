
import { Container } from 'inversify';
import { AuthModule } from './modules/authModule';
import { RepoistoryModule } from './modules/RepositoryModule';
import { ServicesModule } from './modules/ServicesModule';

const container = new Container({
    defaultScope: 'Singleton',
});

const initializeContainer=()=>{
    container.load(AuthModule);
    container.load(RepoistoryModule);
    container.load(ServicesModule);
    
    
}
initializeContainer();


export const getInjection = <T>(symbol: symbol): T => {
    return container.get<T>(symbol);
};

export { container };

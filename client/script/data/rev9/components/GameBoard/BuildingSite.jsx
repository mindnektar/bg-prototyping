import React from 'react';
import resources from 'data/rev9/items/resources';
import Icon from 'atoms/Icon';
import Resource from '../Resource';

const BuildingSite = () => (
    <div className="rev9-building-site">
        <div className="rev9-building-site__top">
            <div className="rev9-building-site__goal-cards">
                <Icon type="goal" context="rev9" />
            </div>

            <div className="rev9-building-site__top-right">
                <div className="rev9-building-site__tower">
                    <div className="rev9-building-site__tower-floors">
                        <Icon type="tower" context="rev9" />
                    </div>

                    <Icon type="chevron" context="rev9" />

                    <div className="rev9-building-site__tower-active">
                        <Icon type="tower" context="rev9" />
                    </div>
                </div>

                <div className="rev9-building-site__ranking">
                    {Array(4).fill(null).map((_, index) => (
                        <div key={index} className="rev9-building-site__ranking-item">
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="rev9-building-site__track">
            {Array(21).fill(null).map((_, index) => (
                <div key={index} className="rev9-building-site__track-item">
                    {index}
                </div>
            ))}
        </div>

        <div className="rev9-building-site__bottom">
            <div className="rev9-building-site__spot">
                <div className="rev9-building-site__resources">
                    {resources.map((resource, index) => (
                        <div key={index}>
                            <Resource {...resource} />
                        </div>
                    ))}
                </div>

                <div className="rev9-building-site__sale">Verkauf</div>

                <div className="rev9-building-site__claim" />
            </div>

            <div className="rev9-building-site__spot">
                <div className="rev9-building-site__resources">
                    {resources.map((resource, index) => (
                        <div key={index}>
                            <Resource {...resource} />
                        </div>
                    ))}
                </div>

                <div className="rev9-building-site__sale">Verkauf</div>

                <div className="rev9-building-site__claim" />
            </div>

            <div className="rev9-building-site__spot">
                <div className="rev9-building-site__resources">
                    {resources.map((resource, index) => (
                        <div key={index}>
                            <Resource {...resource} />
                        </div>
                    ))}
                </div>

                <div className="rev9-building-site__sale">Verkauf</div>

                <div className="rev9-building-site__claim" />
            </div>

            <div className="rev9-building-site__spot">
                <div className="rev9-building-site__resources">
                    {resources.map((resource, index) => (
                        <div key={index}>
                            <Resource {...resource} />
                        </div>
                    ))}
                </div>

                <div className="rev9-building-site__sale">Verkauf</div>

                <div className="rev9-building-site__claim" />
            </div>
        </div>
    </div>
);

export default BuildingSite;

import React from 'react';
import Resource from 'components/rev9/Resource';
import VP from 'components/rev9/VP';
import Gold from 'components/rev9/Gold';
import Icon from 'atoms/Icon';

export default [
    {
        type: 'fabric',
        cost: ['fabric-1', 'wood-1', 'stone-1'],
        skill: {
            text: (
                <div>
                    Erhalte <Resource small type="wild" level={1} />, wenn du eine Weide erkundest.
                </div>
            ),
            condition: 'Erkundung',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['fabric-1'] },
            { input: ['fabric-1'], output: ['fabric-2'] },
            { input: ['fabric-1', 'fabric-1'], output: ['fabric-3'] },
        ],
    },
    {
        type: 'fabric',
        cost: ['fabric-1', 'wheat-1', 'stone-1'],
        skill: {
            text: (
                <div>
                    Zahle <Resource small type="wild" /> weniger, wenn du auf einer Weide baust.
                </div>
            ),
            condition: 'Gebäudebau',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['fabric-1', 'fabric-1'] },
            { input: ['fabric-1'], output: ['gold-3'] },
        ],
    },
    {
        type: 'fabric',
        cost: ['fabric-1', 'wood-1', 'wood-1'],
        skill: {
            text: (
                <div>
                    Erhalte <Gold small value={3} />, wenn du auf einer Weide baust.
                </div>
            ),
            condition: 'Gebäudebau',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['fabric-1'] },
            { input: ['fabric-1'], output: ['wood-1', 'wood-1'] },
            { input: ['fabric-1', 'fabric-1'], output: ['wood-2'] },
        ],
    },
    {
        type: 'fabric',
        cost: ['fabric-1', 'wheat-1', 'wheat-1'],
        skill: {
            text: (
                <div>
                    Erhalte <VP value={1} />, wenn du auf einer Weide baust.
                </div>
            ),
            condition: 'Gebäudebau',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['fabric-1'] },
            { input: ['fabric-1'], output: ['wheat-1', 'wheat-1'] },
            { input: ['fabric-1', 'fabric-1'], output: ['wheat-2'] },
        ],
    },
    {
        type: 'fabric',
        cost: ['fabric-1', 'stone-1', 'stone-1'],
        skill: {
            text: (
                <div>
                    Du darfst deinen <Icon type="wagon" context="rev9" /> von Weiden auf beliebige andere Weiden bewegen (für 1 Bewegungspunkt).
                </div>
            ),
            condition: 'Bewegung',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['fabric-1'] },
            { input: ['fabric-1'], output: ['stone-1', 'stone-1'] },
            { input: ['fabric-1', 'fabric-1'], output: ['stone-2'] },
        ],
    },
    {
        type: 'fabric',
        cost: ['fabric-1', 'wood-1', 'wheat-1'],
        skill: {
            text: (
                <div>
                    Du darfst den Wert deines <Icon type="die" context="rev9" /> um 1 erhöhen, bevor du ihn nutzt.
                </div>
            ),
            condition: 'Planung',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['fabric-1', 'fabric-1'] },
            { input: ['fabric-1'], output: ['wild-1'] },
        ],
    },
    {
        type: 'wood',
        cost: ['wood-1', 'fabric-1', 'stone-1'],
        skill: {
            text: (
                <div>
                    Erhalte <Resource small type="wild" level={1} />, wenn du einen Wald erkundest.
                </div>
            ),
            condition: 'Erkundung',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['wood-1'] },
            { input: ['wood-1'], output: ['wood-2'] },
            { input: ['wood-1', 'wood-1'], output: ['wood-3'] },
        ],
    },
    {
        type: 'wood',
        cost: ['wood-1', 'fabric-1', 'wheat-1'],
        skill: {
            text: (
                <div>
                    Zahle <Resource small type="wild" /> weniger, wenn du in einem Wald baust.
                </div>
            ),
            condition: 'Gebäudebau',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['wood-1', 'wood-1'] },
            { input: ['wood-1'], output: ['gold-3'] },
        ],
    },
    {
        type: 'wood',
        cost: ['wood-1', 'stone-1', 'stone-1'],
        skill: {
            text: (
                <div>
                    Erhalte <Gold small value={3} />, wenn du in einem Wald baust.
                </div>
            ),
            condition: 'Gebäudebau',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['wood-1'] },
            { input: ['wood-1'], output: ['stone-1', 'stone-1'] },
            { input: ['wood-1', 'wood-1'], output: ['stone-2'] },
        ],
    },
    {
        type: 'wood',
        cost: ['wood-1', 'fabric-1', 'fabric-1'],
        skill: {
            text: (
                <div>
                    Erhalte <VP value={1} />, wenn du in einem Wald baust.
                </div>
            ),
            condition: 'Gebäudebau',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['wood-1'] },
            { input: ['wood-1'], output: ['fabric-1', 'fabric-1'] },
            { input: ['wood-1', 'wood-1'], output: ['fabric-2'] },
        ],
    },
    {
        type: 'wood',
        cost: ['wood-1', 'wheat-1', 'wheat-1'],
        skill: {
            text: (
                <div>
                    Du darfst deinen <Icon type="wagon" context="rev9" /> von Wäldern in beliebige andere Wälder bewegen (für 1 Bewegungspunkt).
                </div>
            ),
            condition: 'Bewegung',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['wood-1'] },
            { input: ['wood-1'], output: ['wheat-1', 'wheat-1'] },
            { input: ['wood-1', 'wood-1'], output: ['wheat-2'] },
        ],
    },
    {
        type: 'wood',
        cost: ['wood-1', 'stone-1', 'wheat-1'],
        skill: {
            text: (
                <div>
                    Du darfst eine Handelsaktion mehr ausführen.
                </div>
            ),
            condition: 'Handel',
        },
        neutral: ['vp-2', 'gold-5', 'diamond'],
        production: [
            { input: [], output: ['wood-1', 'wood-1'] },
            { input: ['wood-1'], output: ['wild-1'] },
        ],
    },
];

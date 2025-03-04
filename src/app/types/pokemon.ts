export default interface pokemon {
    name: string
    order: number
    id: number
    is_default: boolean
    height: number
    weight: number
    past_abilities: []
    past_types: []
    held_items: []
    base_experience: string
    location_area_encounters: string
    abilities:[
        {
            ability: {
                name: string
                url: string
            }
            is_hidden: boolean
            slot: number
        }
    ]
    cries: {
        latest: string
        legacy: string
    }
    forms:[
        {
            name: string
            url: string
        }
    ]
    game_indices:[
        {
            game_index: number
            version: {
                name: string
                url: string
            }
        }
    ]
    moves: [
        {
            move: {
                name: string
                url: string
            }
            version_group_details:[
                {
                    level_learned_at: number
                    move_learn_method: {
                        name: string
                        url: string
                    }
                    version_group: {
                        name: string
                        url: string
                    }
                }
            ]
        }
    ]
    species: {
        name: string
        url: string
    }
    sprites: {
        back_default: string
        back_female: string
        back_shiny: string
        back_shiny_female: string
        front_default: string
        front_shiny: string
        front_female: string
        front_shiny_female: string
        other:{
            dream_world:{
                front_default: string
                front_female: string
            }
            home: {
                front_default: string
                front_shiny: string
                front_female: string
                front_shiny_female: string
            }
            ['official-artwork']:{
                front_default: string
                front_shiny: string
            }
            showdown:{
                back_default: string
                back_female: string
                back_shiny: string
                back_shiny_female: string
                front_default: string
                front_shiny: string
                front_female: string
                front_shiny_female: string
            }
        }
    }
    stats: [
        {
            base_stat: number
            stat: {
                name: string
                url: string
            }
        }
    ]
    types: [
        {
            slot: number
            type: {
                name: string
                url: string
            }
        }
    ]
}
//
//  Quote.swift
//  SpeakMarvel
//
//  Created by Akshara Sundararajan on 2/17/18.
//  Copyright © 2018 meera. All rights reserved.
//

import Foundation
class Quote{
    var quote: String
    var difficulty: Float
    var character: String
    var imageURL: URL
    
    init(quote: String, difficulty: Float, character: String, imageURL: URL){
        self.character=character
        self.difficulty=difficulty
        self.quote=quote
        self.imageURL = imageURL
    }
    
}


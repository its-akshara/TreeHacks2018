//
//  Player.swift
//  SpeakMarvel
//
//  Created by Admin on 2/16/18.
//  Copyright © 2018 meera. All rights reserved.
//

import Foundation

class Player{
    var Score: Int
    var difficultyRange: Int
    var runningCorrect: Int
    
    init(Score:Int, difficultyRange:Int, runningCorrect: Int)
    {
        self.difficultyRange=difficultyRange
        self.Score=Score
        self.runningCorrect=runningCorrect
    }
    
    
}


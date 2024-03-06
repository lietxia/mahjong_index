var schedule;
(function (schedule) {
    var NumberOfTimesPlayedInTeetime = createArray(1, 1);
    //Passback by Calculate345678
    var Calculate345678MaxtimesRepeatPlay = 0;
    var Calculate345678AllPlayTogether = false;
    var Calculate345678NumberTimesOnePlayerDoesNotSeeAnother = 10000;
    var NumberOfTimesPlayedCourse;
    var TimeSlotGroupRangeStart;
    var TimeSlotGroupRangeEnd;
    function calculate(XSOMES, players, WEEKS, COURSES, mvarGroupEnd, mvarTimeSlotGroupEnd) {
        var GROUPS = mvarGroupEnd.length - 1;
        var mvarGroupStart = createArray(GROUPS + 1);
        mvarGroupStart[1] = 1;
        for (var group = 2; group <= GROUPS; group++) {
            mvarGroupStart[group] = mvarGroupEnd[group - 1] + 1;
        }
        var mvarCalculationFinished = false;
        var bestNumberTimesOnePlayerDoesNotSeeAnother = createArray(100);
        for (var z_1 = 0; z_1 < 99; z_1++) {
            bestNumberTimesOnePlayerDoesNotSeeAnother[z_1] = 9999999;
        }
        var player = 0;
        var week = 0;
        var TEETIMES = 0;
        var TeeTime = 0;
        var element = 0;
        var Course = 0;
        // ReDim PlayerWhoWillPlay(0, 0, 0) As Integer
        //'                       (week, teetime, element)  =  player number
        // ReDim NumberOfTimesPlayedInTeetime(0, 0) As Integer
        // '                               (player, teetime)  =  number of times played in teetime
        //let NumberOfTimesPlayedInTeetime: number[] = createArray(1, 1);
        // ReDim NumberOfTimesPlayedCourse(0, 0) As Integer
        // '                         (player, course)  =  number of times played in course
        NumberOfTimesPlayedCourse = createArray(players + 1, COURSES + 1);
        NumberOfTimesPlayedCourse[0][0] = 31;
        var Playerteetime = createArray(players + 1, WEEKS + 1);
        var MaxtimesRepeatPlay = 0;
        var AllPlayTogether = false;
        var NumberTimesOnePlayerDoesNotSeeAnother = 0;
        var z = 0;
        var temp = 0;
        var BestAllPlayTogether = false;
        var bestcourseplayeddiff = 0;
        var bestworsecoursepair = 0;
        var bestMaxTimesCoursePlayedinARow = 0;
        var bestNumberofTimesCoursePlayedinRowforAllPlayers = 0;
        var BestSumMaxTimesCoursePlayedinARow = 0;
        var BestMaxtimesRepeatPlay = 0;
        //let BestNumberTimesOnePlayerDoesNotSeeAnother = 0;
        var BestHighestXofAll = 0;
        var BestXDiff = 0;
        var BestYDiff = 0;
        var BestTeeTimeDifference = 0;
        var timeslotgroup = 0;
        var midpoint = 0;
        var timeslotgroupstart = 0;
        var timeslotgroupend = 0;
        var Group = 0;
        var groupstart = 0;
        var groupend = 0;
        TEETIMES = players / XSOMES;
        //let PlayerWhoWillPlay: number[] = createArray(1, 1, 1);
        var PlayerWhoWillPlay = createArray(100, TEETIMES + 1, 2); // event, teetime, element
        // '=====================================
        // 'Set ranges
        // '=====================================
        //let midpoint = 0;
        //let TIMESLOTGROUPS: number;
        var TIMESLOTGROUPS = mvarTimeSlotGroupEnd.length - 1;
        var mvarTimeSlotGroupStart = createArray(TIMESLOTGROUPS + 1);
        mvarTimeSlotGroupStart[1] = 1;
        for (var group = 2; group <= TIMESLOTGROUPS; group++) {
            mvarTimeSlotGroupStart[group] = mvarTimeSlotGroupEnd[group - 1] + 1;
        }
        if (COURSES == 2) {
            TIMESLOTGROUPS = 2;
            TimeSlotGroupRangeStart = createArray(TIMESLOTGROUPS + 1, WEEKS + 1);
            TimeSlotGroupRangeEnd = createArray(TIMESLOTGROUPS + 1, WEEKS + 1);
            for (var week_1 = 1; week_1 <= WEEKS; week_1++) {
                if ((TEETIMES % 2) == 0 || (week_1 % 2)) {
                    midpoint = Math.round(TEETIMES / COURSES);
                }
                else {
                    midpoint = Math.round(TEETIMES / COURSES) + 1;
                }
                TimeSlotGroupRangeStart[1][week_1] = 1;
                TimeSlotGroupRangeEnd[1][week_1] = midpoint;
                TimeSlotGroupRangeStart[2][week_1] = midpoint + 1;
                TimeSlotGroupRangeEnd[2][week_1] = TEETIMES;
            }
        }
        else {
            //TIMESLOTGROUPS = 2; //This is variable in Desktop program
            //let mvarTimeSlotGroupStart:number[] = [0,1,11];
            //let mvarTimeSlotGroupEnd:number[] = [0,10,20];
            TimeSlotGroupRangeStart = createArray(TIMESLOTGROUPS + 1, WEEKS + 1);
            TimeSlotGroupRangeEnd = createArray(TIMESLOTGROUPS + 1, WEEKS + 1);
            for (var timeslotgroup_1 = 1; timeslotgroup_1 <= TIMESLOTGROUPS; timeslotgroup_1++) {
                var timeslotgroupstart_1 = mvarTimeSlotGroupStart[timeslotgroup_1];
                timeslotgroupstart_1 = Math.floor(timeslotgroupstart_1 / 2) + (timeslotgroupstart_1 % 2); //Convert to time slot ranges
                var timeslotgroupend_1 = mvarTimeSlotGroupEnd[timeslotgroup_1];
                timeslotgroupend_1 = Math.floor(timeslotgroupend_1 / 2) + (timeslotgroupend_1 % 2); //Convert to time slot ranges
                for (var week_2 = 1; week_2 <= WEEKS; week_2++) {
                    TimeSlotGroupRangeStart[timeslotgroup_1][week_2] = timeslotgroupstart_1;
                    TimeSlotGroupRangeEnd[timeslotgroup_1][week_2] = timeslotgroupend_1;
                }
            }
        }
        // '=====================================
        // 'Set ranges
        // '=====================================
        // If COURSES = 2 Then
        // TIMESLOTGROUPS = 2
        // ReDim TimeSlotGroupRangeStart(1 To TIMESLOTGROUPS, WEEKS)
        // ReDim TimeSlotGroupRangeEnd(1 To TIMESLOTGROUPS, WEEKS)
        // For week = 1 To WEEKS
        // If (TEETIMES Mod 2) = 0 Or (week Mod 2) Then
        // midpoint = Int(TEETIMES / COURSES)        'Odd
        // Else
        // midpoint = Int(TEETIMES / COURSES) + 1    'Even
        // End If
        // TimeSlotGroupRangeStart(1, week) = 1
        // TimeSlotGroupRangeEnd(1, week) = midpoint
        // TimeSlotGroupRangeStart(2, week) = midpoint + 1
        // TimeSlotGroupRangeEnd(2, week) = TEETIMES
        // Next week
        // Else
        // ReDim TimeSlotGroupRangeStart(1 To GROUPS, WEEKS)
        // ReDim TimeSlotGroupRangeEnd(1 To GROUPS, WEEKS)
        // For timeslotgroup = 1 To TIMESLOTGROUPS
        // timeslotgroupstart = mvarTimeSlotGroupStart(timeslotgroup)
        // timeslotgroupstart = (timeslotgroupstart \ 2) + (timeslotgroupstart Mod 2)  'Convert to time slot ranges
        // timeslotgroupend = mvarTimeSlotGroupEnd(timeslotgroup)
        // timeslotgroupend = (timeslotgroupend \ 2) + (timeslotgroupend Mod 2)  'Convert to time slot ranges
        // For week = 1 To WEEKS
        // TimeSlotGroupRangeStart(timeslotgroup, week) = timeslotgroupstart
        // TimeSlotGroupRangeEnd(timeslotgroup, week) = timeslotgroupend
        // Next week
        // Next timeslotgroup
        // End If
        // '===================================================
        BestAllPlayTogether = false;
        bestcourseplayeddiff = 10000;
        bestworsecoursepair = 10000;
        bestNumberofTimesCoursePlayedinRowforAllPlayers = 100000;
        bestMaxTimesCoursePlayedinARow = 100000;
        BestSumMaxTimesCoursePlayedinARow = 100000;
        BestMaxtimesRepeatPlay = 1000000;
        //BestNumberTimesOnePlayerDoesNotSeeAnother = 1000000;
        BestHighestXofAll = 1000000;
        BestXDiff = 1000000;
        BestYDiff = 1000000;
        BestTeeTimeDifference = 1000000;
        for (z = 1; z < 10000; z++) {
            if (XSOMES == 2) {
                var tempPlayerWhoWillPlay = createArray(WEEKS + 1, TEETIMES + 1, XSOMES + 1); // event, teetime, element
                //ReDim PlayerWhoWillPlay(1 To 50, 1 To TEETIMES, 1 To 2) As Integer
                //let mvarGroupStart: number[] = [1,11];
                //let mvarGroupEnd: number[] = [10,20];
                //let mvarGroupStart = [0,1,11];
                //let mvarGroupEnd = [0,10,20];
                //let mvarGroupStart = [0,1];
                //let mvarGroupEnd = [0,20];
                for (Group = 1; Group <= GROUPS; Group++) {
                    groupstart = mvarGroupStart[Group];
                    groupend = mvarGroupEnd[Group];
                    //groupstart = 1; //mvarGroupStart(Group);
                    //groupend = players; //mvarGroupEnd(Group);
                    //ReDim tempPlayerWhoWillPlay(0, 0, 0) As Integer
                    //Get pairings for 2-somes
                    tempPlayerWhoWillPlay = Calculate2someMatches(groupend - groupstart + 1, 50, Group);
                    for (week = 1; week <= 50; week++) {
                        for (TeeTime = 1; TeeTime <= Math.floor((groupend - groupstart + 1) / 2); TeeTime++) {
                            for (element = 1; element <= 2; element++) {
                                PlayerWhoWillPlay[week][TeeTime + (Math.floor(groupstart / 2) + (groupstart % 2)) - 1][element] = tempPlayerWhoWillPlay[week][TeeTime][element] + groupstart - 1;
                            }
                        }
                    }
                }
                MaxtimesRepeatPlay = 0;
                NumberTimesOnePlayerDoesNotSeeAnother = 0;
                AllPlayTogether = true;
            }
            else {
                //'Get pairings for 345678-somes
                PlayerWhoWillPlay = Calculate345678someMatches(XSOMES, players, WEEKS);
                MaxtimesRepeatPlay = Calculate345678MaxtimesRepeatPlay;
                AllPlayTogether = Calculate345678AllPlayTogether;
                NumberTimesOnePlayerDoesNotSeeAnother = Calculate345678NumberTimesOnePlayerDoesNotSeeAnother;
            }
            if (COURSES > 1) {
                PlayerWhoWillPlay = FindBestCourseRotation(XSOMES, players, WEEKS, COURSES, PlayerWhoWillPlay);
            }
            PlayerWhoWillPlay = FindBestTeetimes(XSOMES, players, WEEKS, COURSES, TIMESLOTGROUPS, PlayerWhoWillPlay);
            // 'Convert PlayerWhoWillPlay(week, teetime, element)  =  player number
            // ' TO ->
            // 'Playerteetime(player, week) = teetime
            // ReDim Playerteetime(1 To players, 1 To WEEKS) As Long
            for (week = 1; week <= WEEKS; week++) {
                for (TeeTime = 1; TeeTime <= TEETIMES; TeeTime++) {
                    for (element = 1; element <= XSOMES; element++) {
                        Playerteetime[PlayerWhoWillPlay[week][TeeTime][element]][week] = TeeTime;
                    }
                }
            }
            // '==============================================
            // 'ANALYSIS AND SAVE BEST matching
            // '1st Play with all
            // '2nd best course rotation
            // '3rd best teetime rotation
            // '==============================================
            // 'OPTOMIZE for BEST COURSE ROTATION
            // 'Find max/min times one course played
            var MaxColValue = 0;
            var MinColValue = 0;
            var MaxRowValue = 0;
            var MinRowValue = 0;
            var courseplayeddiff = 0;
            var xcourseplayeddiff = 0;
            var ycourseplayeddiff = 0;
            var worsecoursepair = 0;
            var NumberofTimesCoursePlayedinRowforAllPlayers = 0;
            var CourseNumberPlayed = 0;
            var lastcoursenumberplayed = 0;
            var MaxTimesCoursePlayedinARow = 0;
            var MaxCourseCounter = 0;
            var SumMaxTimesCoursePlayedinARow = 0;
            var MaxTimesCoursePlayedinARow2 = 0;
            if (COURSES > 1) {
                xcourseplayeddiff = 0;
                for (Course = 1; Course <= COURSES; Course++) {
                    MaxColValue = 0;
                    MinColValue = 100000;
                    for (player = 1; player <= players; player++) {
                        if (MaxColValue < NumberOfTimesPlayedCourse[player][Course]) {
                            MaxColValue = NumberOfTimesPlayedCourse[player][Course];
                        }
                        if (MinColValue > NumberOfTimesPlayedCourse[player][Course]) {
                            MinColValue = NumberOfTimesPlayedCourse[player][Course];
                        }
                    }
                    xcourseplayeddiff = xcourseplayeddiff + (MaxColValue - MinColValue);
                }
                ycourseplayeddiff = 0;
                worsecoursepair = 0;
                //most spread between playing front/back
                for (player = 1; player <= players; player++) {
                    MaxRowValue = 0;
                    MinRowValue = 100000;
                    for (Course = 1; Course <= COURSES; Course++) {
                        if (MaxRowValue < NumberOfTimesPlayedCourse[player][Course]) {
                            MaxRowValue = NumberOfTimesPlayedCourse[player][Course];
                        }
                        if (MinRowValue > NumberOfTimesPlayedCourse[player][Course]) {
                            MinRowValue = NumberOfTimesPlayedCourse[player][Course];
                        }
                    }
                    if ((MaxRowValue - MinRowValue) > worsecoursepair)
                        worsecoursepair = (MaxRowValue - MinRowValue);
                    ycourseplayeddiff = ycourseplayeddiff + (MaxRowValue - MinRowValue);
                }
                courseplayeddiff = xcourseplayeddiff + ycourseplayeddiff;
                // '===# times a course has been played in a row by all players===
                NumberofTimesCoursePlayedinRowforAllPlayers = 0;
                MaxTimesCoursePlayedinARow = 0;
                MaxCourseCounter = 0;
                for (player = 1; player <= players; player++) {
                    lastcoursenumberplayed = -1;
                    for (week = 1; week <= WEEKS; week++) {
                        for (TeeTime = 1; TeeTime <= TEETIMES; TeeTime++) {
                            for (element = 1; element <= XSOMES; element++) {
                                if (PlayerWhoWillPlay[week][TeeTime][element] == player) {
                                    CourseNumberPlayed = GetCourseNumberPlayed(week, TeeTime, TEETIMES, COURSES);
                                    if (lastcoursenumberplayed == CourseNumberPlayed) {
                                        NumberofTimesCoursePlayedinRowforAllPlayers = NumberofTimesCoursePlayedinRowforAllPlayers + 1;
                                        MaxCourseCounter = MaxCourseCounter + 1;
                                        if (MaxCourseCounter > MaxTimesCoursePlayedinARow)
                                            MaxTimesCoursePlayedinARow = MaxCourseCounter;
                                    }
                                    else {
                                        MaxCourseCounter = 0;
                                    }
                                }
                            }
                        }
                        lastcoursenumberplayed = CourseNumberPlayed;
                    }
                }
                //===# of Times player repeats same course in a row=============
                SumMaxTimesCoursePlayedinARow = 0;
                for (player = 1; player <= players; player++) {
                    MaxCourseCounter = 0;
                    MaxTimesCoursePlayedinARow2 = 0;
                    for (week = 1; week <= (WEEKS - 1); week++) {
                        if (GetCourseNumberPlayed(week, Playerteetime[player][week], TEETIMES, COURSES) == GetCourseNumberPlayed(week + 1, Playerteetime[player][week + 1], TEETIMES, COURSES)) {
                            MaxCourseCounter = MaxCourseCounter + 1;
                        }
                        else {
                            if (MaxCourseCounter > MaxTimesCoursePlayedinARow2) {
                                MaxTimesCoursePlayedinARow2 = MaxCourseCounter;
                            }
                            MaxCourseCounter = 0;
                        }
                    }
                    if (MaxTimesCoursePlayedinARow2 == MaxTimesCoursePlayedinARow) {
                        SumMaxTimesCoursePlayedinARow = SumMaxTimesCoursePlayedinARow + MaxTimesCoursePlayedinARow;
                    }
                }
            }
            // '=====================================================================================
            // 'OPTIMIZE for BEST TEETIME ROTATION
            // '=====================================================================================
            // ''Find max/min times one tee played
            var MaxX = 0;
            var MinX = 0;
            var XDiff = 0;
            var HighestXofAll = 0;
            var MaxY = 0;
            var MinY = 0;
            var YDiff = 0;
            // 'NumberOfTimesPlayedInTeetime(player, teetime)
            // '                               x       y
            // 'Find the difference between the number of times each golfers plays each teebox
            // 'Perfect solution would be Xdiff = 0 for event weeks to be played
            // '                          Xdiff = 1 x Number of golfers for odd weeks to be played
            for (player = 1; player <= players; player++) {
                MaxX = 0;
                MinX = 100000;
                for (TeeTime = 1; TeeTime <= TEETIMES; TeeTime++) {
                    if (MaxX < NumberOfTimesPlayedInTeetime[player][TeeTime])
                        MaxX = NumberOfTimesPlayedInTeetime[player][TeeTime];
                    if (MinX > NumberOfTimesPlayedInTeetime[player][TeeTime])
                        MinX = NumberOfTimesPlayedInTeetime[player][TeeTime];
                }
                XDiff = XDiff + (MaxX - MinX);
                if (MaxX > HighestXofAll)
                    HighestXofAll = MaxX;
            }
            // 'Find the difference between the number of times each a teebox is played in a week
            // 'Perfect solution would be Ydiff = 0 for event weeks to be played
            // '                          Ydiff = 1 x Number of teetimes to be played for odd weeks to be played
            YDiff = 0;
            for (TeeTime = 1; TeeTime <= TEETIMES; TeeTime++) {
                MaxY = 0;
                MinY = 100000;
                for (player = 1; player <= players; player++) {
                    if (MaxY < NumberOfTimesPlayedInTeetime[player][TeeTime])
                        MaxY = NumberOfTimesPlayedInTeetime[player][TeeTime];
                    if (MinY > NumberOfTimesPlayedInTeetime[player][TeeTime])
                        MinY = NumberOfTimesPlayedInTeetime[player][TeeTime];
                }
                YDiff = YDiff + (MaxY - MinY);
            }
            // 'Optmize for "Teetime spread"
            // 'Minimize the number of repeat teetimes
            var TeeTimeDifference = 0;
            var diff = 0;
            TeeTimeDifference = 0;
            for (player = 1; player <= players; player++) {
                for (week = 1; week <= WEEKS - 1; week++) {
                    diff = Math.abs(Playerteetime[player][week] - Playerteetime[player][week + 1]);
                    if (diff == 0)
                        TeeTimeDifference = TeeTimeDifference + 1;
                }
            }
            // '=========================================================================
            // '=========================================================================
            //
            //
            //
            // '===FIND BEST OPTIMIZATION==================
            var saveflag = false;
            if (COURSES > 1) {
                //==COURSE OPTIMIZATION===============
                //0. No player repeats play with another (But not required)...If a solution found then require it in any other iteration.
                if (AllPlayTogether || (AllPlayTogether == BestAllPlayTogether)) {
                    //1. Make sure MAX players plays each course an equal number of times
                    if (worsecoursepair < bestworsecoursepair) {
                        saveflag = true;
                    }
                    else if (worsecoursepair <= bestworsecoursepair) {
                        //2. Minimize the MAX number of times a course is played in a row
                        if (MaxTimesCoursePlayedinARow < bestMaxTimesCoursePlayedinARow) {
                            saveflag = true;
                        }
                        else if (MaxTimesCoursePlayedinARow <= bestMaxTimesCoursePlayedinARow) {
                            //3. Make sure fewest number of players play "Max number of times course played in row"
                            if (SumMaxTimesCoursePlayedinARow < BestSumMaxTimesCoursePlayedinARow) {
                                saveflag = true;
                            }
                            else if (SumMaxTimesCoursePlayedinARow <= BestSumMaxTimesCoursePlayedinARow) {
                                //4. Make sure fewest ANY course repeats in a row"
                                if (NumberofTimesCoursePlayedinRowforAllPlayers < bestNumberofTimesCoursePlayedinRowforAllPlayers) {
                                    saveflag = true;
                                }
                                else if (NumberofTimesCoursePlayedinRowforAllPlayers <= bestNumberofTimesCoursePlayedinRowforAllPlayers) {
                                    //5. Make sure fewest course "Spread" Unlikely this will ever trigger
                                    if (courseplayeddiff < bestcourseplayeddiff) {
                                        saveflag = true;
                                    }
                                    else {
                                        if (HighestXofAll < BestHighestXofAll) {
                                            saveflag = true;
                                        }
                                        else if (HighestXofAll <= BestHighestXofAll) {
                                            if (XDiff < BestXDiff && YDiff <= BestYDiff) {
                                                saveflag = true;
                                            }
                                            if (XDiff <= BestXDiff && YDiff < BestYDiff) {
                                                saveflag = true;
                                            }
                                            if (HighestXofAll <= BestHighestXofAll && XDiff <= BestXDiff && YDiff <= BestYDiff) {
                                                if (TeeTimeDifference < BestTeeTimeDifference) {
                                                    saveflag = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                // '==TEETIME OPTIMIZATION===============
                // TeeTimeOptimization:
                //'All golfers must play together
                if (AllPlayTogether || AllPlayTogether == BestAllPlayTogether) {
                    if ((MaxtimesRepeatPlay <= BestMaxtimesRepeatPlay) && (NumberTimesOnePlayerDoesNotSeeAnother < bestNumberTimesOnePlayerDoesNotSeeAnother[MaxtimesRepeatPlay])) {
                        saveflag = true;
                    }
                    else if ((MaxtimesRepeatPlay <= BestMaxtimesRepeatPlay) && (NumberTimesOnePlayerDoesNotSeeAnother <= bestNumberTimesOnePlayerDoesNotSeeAnother[MaxtimesRepeatPlay])) {
                        if (HighestXofAll < BestHighestXofAll) {
                            saveflag = true;
                        }
                        else if (HighestXofAll <= BestHighestXofAll) {
                            if (XDiff < BestXDiff && YDiff <= BestYDiff) {
                                saveflag = true;
                            }
                            if (XDiff <= BestXDiff && YDiff < BestYDiff) {
                                saveflag = true;
                            }
                            if (HighestXofAll <= BestHighestXofAll && XDiff <= BestXDiff && YDiff <= BestYDiff) {
                                if (TeeTimeDifference < BestTeeTimeDifference) {
                                    saveflag = true;
                                }
                            }
                        }
                    }
                }
            }
            if (mvarCalculationFinished) {
                return;
            } //'Exit and stop calculating
            if (saveflag) {
                //try {
                bestNumberTimesOnePlayerDoesNotSeeAnother[MaxtimesRepeatPlay] = NumberTimesOnePlayerDoesNotSeeAnother;
                //} catch(e) {}
                BestAllPlayTogether = AllPlayTogether;
                bestcourseplayeddiff = courseplayeddiff;
                bestworsecoursepair = worsecoursepair;
                bestNumberofTimesCoursePlayedinRowforAllPlayers = NumberofTimesCoursePlayedinRowforAllPlayers;
                bestMaxTimesCoursePlayedinARow = MaxTimesCoursePlayedinARow;
                BestSumMaxTimesCoursePlayedinARow = SumMaxTimesCoursePlayedinARow;
                BestMaxtimesRepeatPlay = MaxtimesRepeatPlay;
                //BestNumberTimesOnePlayerDoesNotSeeAnother = NumberTimesOnePlayerDoesNotSeeAnother;
                BestHighestXofAll = HighestXofAll;
                BestXDiff = XDiff;
                BestYDiff = YDiff;
                BestTeeTimeDifference = TeeTimeDifference;
                var FromGridMaxtimesRepeatPlay = 0;
                var FromGridNumberTimesOnePlayerDoesNotSeeAnother = 0;
                // GoSub ScheduleSummary
                // Summary.Caption = " Iteration " & z & " produced the last best solution"
                // PlayerPlaysLabel.Caption = "Maximum of " & Format$(FromGridMaxtimesRepeatPlay) & " repeats in " & week & " events." & vbCrLf & vbCrLf & _
                // "Number of pairings that do not see each other:" & Str$(FromGridNumberTimesOnePlayerDoesNotSeeAnother) & vbCrLf & vbCrLf
                // If FromGridNumberTimesOnePlayerDoesNotSeeAnother = 0 Then PlayerPlaysLabel.Caption = PlayerPlaysLabel.Caption & " All " & pairingwhat & "s play together"
                //
                // TeeTimeLabel.Caption = "Tee diff player:" & XDiff & "  teetime:" & YDiff
                // TeeTimeRepeatLabel.Caption = "Repeat teetimes:" & TeeTimeDifference
                // CourseLabel = "Biggest spread " & worsecoursepair & vbCr & vbCr & "Schedule spread: " & xcourseplayeddiff & vbCr & "Players spread: " & ycourseplayeddiff & vbCr & "Total spread: " & bestcourseplayeddiff
                if (MaxTimesCoursePlayedinARow == 0) {
                    temp = 0;
                }
                else {
                    temp = BestSumMaxTimesCoursePlayedinARow / MaxTimesCoursePlayedinARow;
                } // CHUCK was integer division
                // CourseRepeatLabel = "Max repeats: " & MaxTimesCoursePlayedinARow & vbCr & vbCr & "# of players that repeat max: " & temp & vbCr & vbCr & "Courses played in a row (all players): " & NumberofTimesCoursePlayedinRowforAllPlayers
                var eventstring = "";
                var matchstring = "";
                // ReDim mvarTeamsOpposingTeam(1 To mvarPlayersOrTeams, 1 To 50) As Long
                // ReDim mvarTeamsTeeTime(1 To mvarPlayersOrTeams, 1 To 50) As Long
                // ReDim mvarTeamsCourse(1 To mvarPlayersOrTeams, 1 To 50) As Long
                //
                // temp = WEEKS
                // For week = 1 To UBound(PlayerWhoWillPlay())
                // eventstring = "event[" & week & "]"
                // For TeeTime = 1 To TEETIMES
                // matchstring = eventstring & "/match[" & TeeTime & "]"
                //
                // For element = 1 To XSOMES
                //
                // If XSOMES = 2 Then
                // If element = 1 Then
                // mvarTeamsOpposingTeam(PlayerWhoWillPlay(week, TeeTime, element), week) = PlayerWhoWillPlay(week, TeeTime, element + 1)
                // Else
                // mvarTeamsOpposingTeam(PlayerWhoWillPlay(week, TeeTime, element), week) = PlayerWhoWillPlay(week, TeeTime, element - 1)
                // End If
                // End If
                // mvarTeamsTeeTime(PlayerWhoWillPlay(week, TeeTime, element), week) = TeeTime
                // mvarTeamsCourse(PlayerWhoWillPlay(week, TeeTime, element), week) = GetCourseNumberPlayed(week, TeeTime, TEETIMES, COURSES)
                //
                //
                // Next element
                // Next TeeTime
                // Next week
                // 'The Scheduler has found a good solution for your schedule.  However, it will continue to look indefinitely for a better solution. If you let Scheduler continue to look, it may be able to find a better schedule. Click EXIT at anytime to use the current solution. For details about the type of schedule it has built, click the "Show details" button.
                // Call Working1.WorkingTimer(False)
                // Working1.Visible = False
                // ScheduleFound.Visible = True
                // DetailsButton.Visible = True
                // FinishedButton.Visible = True
                //
                //
                // mvarSeedNewSave = mvarSeedNew
                // Beep
                // End If
                //
                // DoEvents
                //
                //
                var status_1 = { "iteration": z, "bestiteration": z };
                postToForm(status_1);
                postToForm(PlayerWhoWillPlay);
                if (COURSES == 2) {
                    postToForm(NumberOfTimesPlayedCourse);
                    //==Number of Times player repeats same course in a row=============
                    var NumberOfTimesPlayedCourseRepeats = createArray(players + 1);
                    NumberOfTimesPlayedCourseRepeats[0] = 32;
                    for (player = 1; player <= players; player++) {
                        var MaxCourseCounter_1 = 0;
                        var MaxTimesCoursePlayedinARow_1 = 0;
                        for (week = 1; week <= WEEKS - 1; week++) {
                            if (GetCourseNumberPlayed(week, Playerteetime[player][week], TEETIMES, COURSES) == GetCourseNumberPlayed(week + 1, Playerteetime[player][week + 1], TEETIMES, COURSES)) {
                                MaxCourseCounter_1 = MaxCourseCounter_1 + 1;
                            }
                            else {
                                if (MaxCourseCounter_1 > MaxTimesCoursePlayedinARow_1) {
                                    MaxTimesCoursePlayedinARow_1 = MaxCourseCounter_1;
                                }
                                MaxCourseCounter_1 = 0;
                            }
                        }
                        NumberOfTimesPlayedCourseRepeats[player] = MaxTimesCoursePlayedinARow_1;
                    }
                    postToForm(NumberOfTimesPlayedCourseRepeats);
                }
            }
            else {
                var status_2 = { "iteration": z };
                postToForm(status_2);
            }
        }
        //
        //
        //
        //
        //
        // ScheduleSummary:
        //     '==THE PAIRINGS========================================
        // With PairingGrid
        // .MaxRows = WEEKS
        // For TeeTime = 1 To TEETIMES
        // For week = 1 To WEEKS
        // .Col = TeeTime
        // .Row = week
        // .Text = ""
        // For element = 1 To XSOMES - 1
        // .Text = .Text & PlayerWhoWillPlay(week, TeeTime, element) & "-"
        // Next element
        // .Text = .Text & PlayerWhoWillPlay(week, TeeTime, element)
        // Next week
        // Next TeeTime
        // End With
        //
        // '==Number of Times one player plays another=============
        // 'ReDim PlayerWhoWillPlay(0, 0, 0) As Integer
        // '                     (week, teetime, element)  =  player number
        // 'ReDim NumberOfTimesPlayedInTeetime(0, 0) As Integer
        //
        // Dim player2 As Long
        // Dim element2 As Long
        // With PlayerPlays
        // If players < 10 Then .MaxRows = 10 Else .MaxRows = players
        // If players < 10 Then .MaxCols = 10 Else .MaxCols = players
        // .Row = -1: .Col = -1
        // .Action = 12 'Clear text
        // For player = 1 To players
        // .Row = player
        // .Col = player
        // .Text = "X"
        // .BackColor = 0
        // For player2 = 1 To player - 1
        // For week = 1 To WEEKS
        // For TeeTime = 1 To TEETIMES
        // For element = 1 To XSOMES
        // If PlayerWhoWillPlay(week, TeeTime, element) = player Then
        // For element2 = 1 To XSOMES
        // If PlayerWhoWillPlay(week, TeeTime, element2) = player2 Then
        // .Row = player
        // .Col = player2
        // .Text = Val(.Text) + 1
        //
        // .Row = player2
        // .Col = player
        // .Text = Val(.Text) + 1
        //
        // End If
        // Next element2
        // End If
        // Next element
        // Next TeeTime
        // Next week
        // Next player2
        // Next player
        //
        //
        // FromGridMaxtimesRepeatPlay = -1
        // FromGridNumberTimesOnePlayerDoesNotSeeAnother = 0
        // For player = 2 To players
        // .Row = player
        // For player2 = 1 To player - 1
        // .Col = player2
        // temp = Val(.Text)
        // If temp > FromGridMaxtimesRepeatPlay Then FromGridMaxtimesRepeatPlay = temp
        // If temp = 0 Then FromGridNumberTimesOnePlayerDoesNotSeeAnother = FromGridNumberTimesOnePlayerDoesNotSeeAnother + 1
        // Next player2
        // Next player
        // FromGridMaxtimesRepeatPlay = FromGridMaxtimesRepeatPlay - 1
        // 'FromGridAllPlayTogether As Long
        //
        //
        // End With
        //
        // '==Number of Times player plays teetime=============
        // With TeeTimeGrid
        // If players < 10 Then .MaxRows = 10 Else .MaxRows = players
        // If TEETIMES < 10 Then .MaxCols = 10 Else .MaxCols = TEETIMES
        // For player = 1 To players
        // .Row = player
        // For TeeTime = 1 To TEETIMES
        // .Col = TeeTime
        // .Text = NumberOfTimesPlayedInTeetime(player, TeeTime)
        // Next TeeTime
        // Next player
        // End With
        //
        // '==Number of Times player repeats same tee in a row=============
        // With TeeTimeRepeatGrid
        // .Row = -1: .Col = -1
        // .Action = 12 'Clear text
        // .Col = 1
        // If players < 10 Then .MaxRows = 10 Else .MaxRows = players
        // For player = 1 To players
        // For week = 1 To WEEKS - 1
        // If Playerteetime(player, week) = Playerteetime(player, week + 1) Then
        // .Row = player
        // .Text = Val(.Text) + 1
        // End If
        // Next week
        // Next player
        // End With
        //
        //
        if (COURSES > 1) {
        }
        // '
        // Return
        //
    }
    schedule.calculate = calculate;
    function Calculate2someMatches(players, events, group) {
        var ns = randomIntFromInterval(1, players);
        var ne = players - 1;
        var teetimes = players / 2;
        var playerWhoWillPlay = createArray(100, teetimes + 1, 2); // event, teetime, element
        var r = createArray(players + 1, players + 1);
        var period = createArray(players + 1);
        for (var i = 0; i <= players; i++) {
            period[i] = 0;
        }
        for (var j = 1; j <= ne; j++) {
            for (var i = 1; i <= ne; i++) {
                r[i][j] = ns + j + i - 3;
                if (r[i][j] > 2 * ne) {
                    r[i][j] = r[i][j] - 2 * ne;
                }
                if (r[i][j] > ne) {
                    r[i][j] = r[i][j] - ne;
                }
                if (r[i][j] <= 0) {
                    r[i][j] = r[i][j] + ne;
                }
                if (i == j) {
                    r[players][j] = r[i][j];
                }
            }
        }
        for (var i = 1; i <= ne; i++) {
            r[i][players] = r[players][i];
        }
        // Assign to playerwhowillplay element
        for (var j = 1; j <= players; j++) {
            for (var i = 1; i <= players; i++) {
                if (i < j) {
                    period[r[i][j]] = period[r[i][j]] + 1;
                    var teetime = period[r[i][j]];
                    playerWhoWillPlay[r[i][j]][teetime][1] = i;
                    playerWhoWillPlay[r[i][j]][teetime][2] = j;
                }
            }
        }
        for (var e = 1; e <= events - ne; e++) {
            for (var t = 1; t <= teetimes; t++) {
                playerWhoWillPlay[ne + e][t][1] = playerWhoWillPlay[e][t][1];
                playerWhoWillPlay[ne + e][t][2] = playerWhoWillPlay[e][t][2];
            }
        }
        return playerWhoWillPlay;
    }
    schedule.Calculate2someMatches = Calculate2someMatches;
    function FindBestTeetimes(XSOMES, players, WEEKS, COURSES, TIMESLOTGROUPS, PlayerWhoWillPlay) {
        var TEETIMES = players / XSOMES;
        // // '=====================================
        // // 'Set ranges
        // // '=====================================
        // let midpoint = 0;
        // //let TIMESLOTGROUPS: number;
        //
        // let TimeSlotGroupRangeStart: number[];
        // let TimeSlotGroupRangeEnd: number[];
        // if (COURSES == 2) {
        //     TIMESLOTGROUPS = 2;
        //     TimeSlotGroupRangeStart = createArray(TIMESLOTGROUPS + 1, WEEKS + 1);
        //     TimeSlotGroupRangeEnd = createArray(TIMESLOTGROUPS + 1, WEEKS + 1);
        //     for (let week = 1; week <= WEEKS; week++) {
        //         if ((TEETIMES % 2) == 0 || (week % 2)) {
        //             midpoint = Math.round(TEETIMES / COURSES);
        //             //Odd
        //         } else {
        //             midpoint = Math.round(TEETIMES / COURSES) + 1;
        //             //Even
        //         }
        //         TimeSlotGroupRangeStart[1][week] = 1;
        //         TimeSlotGroupRangeEnd[1][week] = midpoint;
        //         TimeSlotGroupRangeStart[2][week] = midpoint + 1;
        //         TimeSlotGroupRangeEnd[2][week] = TEETIMES;
        //     }
        // } else {
        //     //TIMESLOTGROUPS = 2; //This is variable in Desktop program
        //     let mvarTimeSlotGroupStart:number[] = [0,1,11];
        //     let mvarTimeSlotGroupEnd:number[] = [0,10,20];
        //
        //
        //     TimeSlotGroupRangeStart = createArray(TIMESLOTGROUPS + 1, WEEKS + 1);
        //     TimeSlotGroupRangeEnd = createArray(TIMESLOTGROUPS + 1, WEEKS + 1);
        //
        //
        //     for (let timeslotgroup = 1; timeslotgroup <= TIMESLOTGROUPS; timeslotgroup++) {
        //         let timeslotgroupstart = mvarTimeSlotGroupStart[timeslotgroup];
        //         timeslotgroupstart = Math.floor(timeslotgroupstart / 2) + (timeslotgroupstart % 2); //Convert to time slot ranges
        //         let timeslotgroupend = mvarTimeSlotGroupEnd[timeslotgroup];
        //         timeslotgroupend = Math.floor(timeslotgroupend / 2) + (timeslotgroupend % 2);   //Convert to time slot ranges
        //         for (let week = 1; week <= WEEKS; week++) {
        //             TimeSlotGroupRangeStart[timeslotgroup][week] = timeslotgroupstart;
        //             TimeSlotGroupRangeEnd[timeslotgroup][week] = timeslotgroupend;
        //         }
        //     }
        // }
        var player = 0;
        var week = 0;
        var element = 0;
        var TeeTime = 0;
        var ElementHasPlayed = 0;
        var teetime2 = 0;
        var temp = 0;
        var PossibleSwapElementHasPlayed = 0;
        var ElementHasPlayed2ndPosition = 0;
        var PossibleSwapElementHasPlayed2ndPosition = 0;
        var TryWithNoMoveCounter = 0;
        var z = 0;
        var MaxTryWithNoMoveCounter = 0;
        var timeslotgroup = 0;
        var lowTimeSlotBoundary = 1;
        var highTimeSlotBoundary = 5;
        //TEETIMES = players / XSOMES;
        //'===How many times has player played teetime=======
        //ReDim NumberOfTimesPlayedInTeetime(1 To players, 1 To TEETIMES) As Integer
        NumberOfTimesPlayedInTeetime = createArray(players + 1, TEETIMES + 1);
        for (var p = 0; p <= players; p++) {
            for (var t = 0; t <= TEETIMES; t++) {
                NumberOfTimesPlayedInTeetime[p][t] = 0;
            }
        }
        for (TeeTime = 1; TeeTime <= TEETIMES; TeeTime++) {
            for (week = 1; week <= WEEKS; week++) {
                for (element = 1; element <= XSOMES; element++) {
                    NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][TeeTime][element]][TeeTime] = NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][TeeTime][element]][TeeTime] + 1;
                }
            }
        }
        MaxTryWithNoMoveCounter = randomIntFromInterval(1000, 15000);
        do {
            // '==SWAP ROUTINE==============
            // 'Find a random point to look at.
            week = randomIntFromInterval(1, WEEKS);
            // 'Range restricts what time slot can move
            timeslotgroup = randomIntFromInterval(1, TIMESLOTGROUPS);
            lowTimeSlotBoundary = TimeSlotGroupRangeStart[timeslotgroup][week];
            highTimeSlotBoundary = TimeSlotGroupRangeEnd[timeslotgroup][week];
            TeeTime = randomIntFromInterval(lowTimeSlotBoundary, highTimeSlotBoundary);
            // 'How many times has element played this teetime?
            ElementHasPlayed = 0;
            for (element = 1; element <= XSOMES; element++) {
                ElementHasPlayed += NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][TeeTime][element]][TeeTime];
            }
            // 'See if another element has played less times
            for (z = lowTimeSlotBoundary; z <= highTimeSlotBoundary; z++) {
                teetime2 = randomIntFromInterval(lowTimeSlotBoundary, highTimeSlotBoundary);
                PossibleSwapElementHasPlayed = 0;
                ElementHasPlayed2ndPosition = 0;
                PossibleSwapElementHasPlayed2ndPosition = 0;
                for (element = 1; element <= XSOMES; element++) {
                    PossibleSwapElementHasPlayed = PossibleSwapElementHasPlayed + NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][teetime2][element]][TeeTime];
                    ElementHasPlayed2ndPosition = ElementHasPlayed2ndPosition + NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][TeeTime][element]][teetime2];
                    PossibleSwapElementHasPlayed2ndPosition = PossibleSwapElementHasPlayed2ndPosition + NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][teetime2][element]][teetime2];
                }
                if (ElementHasPlayed >= (PossibleSwapElementHasPlayed + XSOMES) && (ElementHasPlayed2ndPosition + XSOMES) < PossibleSwapElementHasPlayed2ndPosition) {
                    for (element = 1; element <= XSOMES; element++) {
                        temp = PlayerWhoWillPlay[week][TeeTime][element];
                        NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][TeeTime][element]][TeeTime] = NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][TeeTime][element]][TeeTime] - 1;
                        PlayerWhoWillPlay[week][TeeTime][element] = PlayerWhoWillPlay[week][teetime2][element];
                        NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][teetime2][element]][teetime2] = NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][teetime2][element]][teetime2] - 1;
                        NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][TeeTime][element]][TeeTime] = NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][TeeTime][element]][TeeTime] + 1;
                        PlayerWhoWillPlay[week][teetime2][element] = temp;
                        NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][teetime2][element]][teetime2] = NumberOfTimesPlayedInTeetime[PlayerWhoWillPlay[week][teetime2][element]][teetime2] + 1;
                    }
                    TryWithNoMoveCounter = 0;
                    break; // Exit For
                }
                else {
                    TryWithNoMoveCounter++;
                }
            }
        } while (TryWithNoMoveCounter <= MaxTryWithNoMoveCounter);
        // 'GoSub PrintPairingGrid
        //
        // Exit Sub
        //
        //
        //
        //alert("Done!");
        //this.postMessage(PlayerWhoWillPlay); //Chuck this works
        return PlayerWhoWillPlay;
        //
        //
        // '==============================================
        // 'VIEWING
        // '==============================================
        // 'Pairing Grid
        // PrintPairingGrid:
        //     With PairingGrid
        // .MaxRows = WEEKS  'Viewing
        // For TeeTime = 1 To TEETIMES
        // For week = 1 To WEEKS
        // .Col = TeeTime
        // .Row = week
        // .Text = ""
        // For element = 1 To XSOMES - 1
        // .Text = .Text & PlayerWhoWillPlay(week, TeeTime, element) & "-"
        // Next element
        // .Text = .Text & PlayerWhoWillPlay(week, TeeTime, element)
        // Next week
        // Next TeeTime
        // End With
        //
        // 'Teetime grid
        // TeeTimeGridW.MaxRows = players
        // For player = 1 To players
        // TeeTimeGridW.Row = player
        // For TeeTime = 1 To TEETIMES
        // TeeTimeGridW.Col = TeeTime
        // TeeTimeGridW.Text = NumberOfTimesPlayedInTeetime(player, TeeTime)
        // Next TeeTime
        // Next player
        //
        // 'Course grid
        // Dim timecourseplayed As Long
        // For player = 1 To players
        // CourseGridW.Row = player
        //
        // timecourseplayed = 0
        // For TeeTime = 1 To TEETIMES \ 2
        // timecourseplayed = timecourseplayed + NumberOfTimesPlayedInTeetime(player, TeeTime)
        // Next TeeTime
        // CourseGridW.Col = 1
        // CourseGridW.Text = timecourseplayed
        //
        // timecourseplayed = 0
        // For TeeTime = TEETIMES \ 2 + 1 To TEETIMES
        // timecourseplayed = timecourseplayed + NumberOfTimesPlayedInTeetime(player, TeeTime)
        // Next TeeTime
        // CourseGridW.Col = 2
        // CourseGridW.Text = timecourseplayed
        // Next player
        // '================================================
        //
        // Return
    }
    schedule.FindBestTeetimes = FindBestTeetimes;
    function Calculate345678someMatches(XSOMES, players, WEEKS) {
        //Assures each golfer will play with every other golfer 3-8somes
        //Dim PlayerWhoWillPlay(1 To 50, 1 To 50, 1 To 8) As Integer   //(week, teetime, element)  =  player number
        //Pass back BestMaxtimesRepeatPlay = 0, AllPlayedTogether = false, BestNumberTimesOnePlayerDoesNotSeeAnother = 0
        var TeeTime = 0;
        var element = 0;
        var MaxtimesRepeatPlay = 0;
        var NumberTimesOnePlayerDoesNotSeeAnother = 0;
        var NumberOfTries = 0;
        var week = 0;
        var xsomepos = 0;
        var element1 = 0;
        var element2 = 0;
        var bestelement = 0;
        var player = 0;
        var mincount = 0;
        var XSome = 0;
        var counter = 0;
        var AllPlayTogether = false;
        var MaxNumberOfTries = 0;
        var TEETIMES = players / XSOMES;
        var AllPlayedTogether = false;
        var BestNumberOfWeeks = 10000;
        var BestMaxtimesRepeatPlay = 10000;
        var BestNumberTimesOnePlayerDoesNotSeeAnother = 10000;
        var PlayerWhoWillPlay = createArray(WEEKS + 1, TEETIMES + 1, XSOMES + 1); // event, teetime, element
        // 'Initialize Golfer pointer
        // ReDim GolferPt(1 To players) As Integer
        var GolferPt = createArray(players + 1);
        for (var p = 1; p <= players; p++) {
            GolferPt[p] = p;
        }
        MaxNumberOfTries = randomIntFromInterval(1, 1500);
        for (NumberOfTries = 1; NumberOfTries <= MaxNumberOfTries; NumberOfTries++) {
            // ReDim timesplayed(1 To players, 1 To players) As Integer    'Vaule= # times played
            var timesplayed = createArray(players + 1, players + 1);
            for (var p1 = 1; p1 <= players; p1++) {
                for (var p2 = 1; p2 <= players; p2++) {
                    timesplayed[p1][p2] = 0;
                }
            }
            // ReDim TeeTimeOn(1 To players) As Integer                    'Value= teetime contained in
            var TeeTimeOn = createArray(players + 1);
            // ReDim XSomeMakeup(1 To XSOMES) As Integer
            var XSomeMakeup = createArray(XSOMES + 1);
            for (var xs = 1; xs <= XSOMES; xs++) {
                XSomeMakeup[xs] = 0;
            }
            // ReDim TeamOnArray(1 To players, 1 To WEEKS) As Integer
            var TeamOnArray = createArray(players + 1, WEEKS + 1);
            week = 0;
            do {
                week = week + 1;
                // ReDim UsedInEvent(1 To players)
                var UsedInEvent = createArray(players + 1);
                for (var p = 1; p <= players; p++) {
                    UsedInEvent[p] = 0;
                }
                TeeTime = 1;
                xsomepos = 1;
                do {
                    mincount = 10000;
                    //Get best possible element
                    for (element1 = 1; element1 <= players; element1++) {
                        counter = 0;
                        if (UsedInEvent[element1] == 0) {
                            for (element = 1; element <= xsomepos - 1; element++) {
                                element2 = XSomeMakeup[element];
                                counter = counter + timesplayed[element1][element2];
                            }
                            if (counter <= mincount) {
                                bestelement = element1;
                                mincount = counter;
                            }
                        }
                    }
                    //Randomize find
                    for (XSome = 1; XSome <= XSOMES; XSome++) {
                        element1 = randomIntFromInterval(1, players);
                        counter = 0;
                        if (UsedInEvent[element1] == 0) {
                            for (element = 1; element <= xsomepos - 1; element++) {
                                element2 = XSomeMakeup[element];
                                counter = counter + timesplayed[element1][element2];
                            }
                            if (counter <= mincount) {
                                bestelement = element1;
                                mincount = counter;
                            }
                        }
                    }
                    UsedInEvent[bestelement] = 1;
                    element1 = bestelement;
                    TeeTimeOn[element1] = TeeTime;
                    XSomeMakeup[xsomepos] = element1; //Mark times played array
                    for (element = 1; element <= xsomepos - 1; element++) {
                        element2 = XSomeMakeup[element];
                        if (element1 != element2) {
                            timesplayed[element1][element2] = timesplayed[element1][element2] + 1;
                            timesplayed[element2][element1] = timesplayed[element2][element1] + 1;
                        }
                    }
                    if (XSOMES == xsomepos) {
                        TeeTime = TeeTime + 1;
                        xsomepos = 1;
                        for (var xs = 1; xs <= XSOMES; xs++) {
                            XSomeMakeup[xs] = 0;
                        }
                    }
                    else {
                        xsomepos = xsomepos + 1;
                    }
                } while (TeeTime <= TEETIMES);
                //Put results
                for (TeeTime = 1; TeeTime <= TEETIMES; TeeTime++) {
                    for (player = 1; player <= players; player++) {
                        if (TeeTimeOn[player] == TeeTime)
                            TeamOnArray[GolferPt[player]][week] = TeeTime;
                    }
                }
                AllPlayTogether = true;
                MaxtimesRepeatPlay = 0;
                NumberTimesOnePlayerDoesNotSeeAnother = 0;
                //Get best possible element
                for (element1 = 1; element1 <= players; element1++) {
                    for (element2 = 1; element2 <= players; element2++) {
                        if (element1 != element2) {
                            if (timesplayed[element1][element2] == 0) {
                                NumberTimesOnePlayerDoesNotSeeAnother = NumberTimesOnePlayerDoesNotSeeAnother + 1;
                                AllPlayTogether = false;
                            }
                            if (timesplayed[element1][element2] > MaxtimesRepeatPlay)
                                MaxtimesRepeatPlay = timesplayed[element1][element2] - 1;
                        }
                    }
                }
                NumberTimesOnePlayerDoesNotSeeAnother = NumberTimesOnePlayerDoesNotSeeAnother / 2;
            } while (week < WEEKS);
            if (week <= BestNumberOfWeeks && MaxtimesRepeatPlay <= BestMaxtimesRepeatPlay && NumberTimesOnePlayerDoesNotSeeAnother <= BestNumberTimesOnePlayerDoesNotSeeAnother) {
                if (week < BestNumberOfWeeks) {
                    BestMaxtimesRepeatPlay = 1000;
                    BestNumberTimesOnePlayerDoesNotSeeAnother = 10000;
                }
                if ((MaxtimesRepeatPlay < BestMaxtimesRepeatPlay) || (NumberTimesOnePlayerDoesNotSeeAnother < BestNumberTimesOnePlayerDoesNotSeeAnother)) {
                    if (MaxtimesRepeatPlay < BestMaxtimesRepeatPlay)
                        BestNumberTimesOnePlayerDoesNotSeeAnother = 10000;
                    BestNumberOfWeeks = week;
                    BestMaxtimesRepeatPlay = MaxtimesRepeatPlay;
                    BestNumberTimesOnePlayerDoesNotSeeAnother = NumberTimesOnePlayerDoesNotSeeAnother;
                    //Convert TeamArray to PlayerWhoWillPlay
                    //ReDim PlayerWhoWillPlay(1 To WEEKS, 1 To TEETIMES, 1 To XSOMES) As Integer
                    for (var p1 = 1; p1 <= WEEKS; p1++) {
                        for (var p2 = 1; p2 <= TEETIMES; p2++) {
                            for (var p3 = 1; p3 <= XSOMES; p3++) {
                                PlayerWhoWillPlay[p1][p2][p3] = 0;
                            }
                        }
                    }
                    for (player = 1; player <= players; player++) {
                        for (week = 1; week <= BestNumberOfWeeks; week++) {
                            for (element = 1; element <= XSOMES; element++) {
                                if (PlayerWhoWillPlay[week][TeamOnArray[player][week]][element] <= 0) {
                                    break;
                                }
                            }
                            PlayerWhoWillPlay[week][TeamOnArray[player][week]][element] = player;
                        }
                    }
                    if (AllPlayTogether == true) {
                        AllPlayedTogether = true; //Perfect solution found
                    }
                }
            }
        }
        Calculate345678MaxtimesRepeatPlay = BestMaxtimesRepeatPlay;
        Calculate345678AllPlayTogether = AllPlayedTogether;
        Calculate345678NumberTimesOnePlayerDoesNotSeeAnother = BestNumberTimesOnePlayerDoesNotSeeAnother;
        return PlayerWhoWillPlay;
    }
    schedule.Calculate345678someMatches = Calculate345678someMatches;
    function GetCourseNumberPlayed(week, TeeTime, NumTeetimes, NumCourses) {
        var functionReturnValue = 0;
        var midpoint = 0;
        //  GetCourseNumberPlayed = (teetime - 1) \ (NumTeetimes / NumCourses)
        if ((NumTeetimes % 2) == 0 || (week % 2)) {
            //Odd
            midpoint = Math.round(NumTeetimes / NumCourses);
        }
        else {
            //Even
            midpoint = Math.round(NumTeetimes / NumCourses) + 1;
        }
        if (TeeTime > midpoint) {
            functionReturnValue = 1;
        }
        else {
            functionReturnValue = 0;
        }
        return functionReturnValue;
    }
    function FindBestCourseRotation(XSOMES, players, WEEKS, COURSES, PlayerWhoWillPlay) {
        // CHUCK these are retruned too!!! PlayerWhoWillPlay() As Integer, NumberOfTimesPlayedCourse() As Integer)
        // Private Sub FindBestCourseRotation(XSOMES As Long, players As Long, WEEKS As Long, COURSES As Long, PlayerWhoWillPlay() As Integer, NumberOfTimesPlayedCourse() As Integer)
        var player = 0;
        var week = 0;
        var element = 0;
        var Course = 0;
        var TEETIMES = 0;
        var TeeTime = 0;
        var teetime2 = 0;
        var temp = 0;
        var minTimesPlayedCourse1 = 0;
        var playerwhoneedstoplaycourse1themost = 0;
        var teetimethatneedstoplaycourse1themost = 0;
        TEETIMES = players / XSOMES; //
        // '===How many times has player played courses=======
        // ReDim CourseWhoWillPlay(1 To WEEKS, 1 To TEETIMES, 1 To XSOMES) As Integer
        // '                     (week, teetime, element)  =  course number
        var CourseWhoWillPlay = createArray(WEEKS + 1, TEETIMES + 1, XSOMES + 1);
        for (week = 1; week <= WEEKS; week++) {
            for (TeeTime = 1; TeeTime <= TEETIMES; TeeTime++) {
                for (element = 1; element <= XSOMES; element++) {
                    CourseWhoWillPlay[week][TeeTime][element] = 0;
                }
            }
        }
        // ReDim NumberOfTimesPlayedCourse(1 To players, 1 To COURSES) As Integer
        for (var p = 1; p <= players; p++) {
            for (var c = 1; c < COURSES; c++) {
                NumberOfTimesPlayedCourse[p][c] = 0;
            }
        }
        var assigncount = 0;
        var maxassigncount = 0;
        for (week = 1; week <= WEEKS; week++) {
            assigncount = 0;
            maxassigncount = Math.floor((TEETIMES / 2) + (TEETIMES % 2) * ((TEETIMES + week) % 2));
            do {
                //Find match that needs to play the front the most
                minTimesPlayedCourse1 = 10000;
                teetimethatneedstoplaycourse1themost = 0;
                for (TeeTime = 1; TeeTime <= TEETIMES; TeeTime++) {
                    for (element = 1; element <= XSOMES; element++) {
                        //Has not yet been assigned a course
                        if (CourseWhoWillPlay[week][TeeTime][element] == 0) {
                            if (NumberOfTimesPlayedCourse[PlayerWhoWillPlay[week][TeeTime][element]][1] < minTimesPlayedCourse1) {
                                playerwhoneedstoplaycourse1themost = PlayerWhoWillPlay[week][TeeTime][element];
                                teetimethatneedstoplaycourse1themost = TeeTime;
                                minTimesPlayedCourse1 = NumberOfTimesPlayedCourse[PlayerWhoWillPlay[week][TeeTime][element]][1];
                            }
                        }
                    }
                }
                //Assign course
                for (element = 1; element <= XSOMES; element++) {
                    if (minTimesPlayedCourse1 < 10000) {
                        CourseWhoWillPlay[week][teetimethatneedstoplaycourse1themost][element] = 1;
                        NumberOfTimesPlayedCourse[PlayerWhoWillPlay[week][teetimethatneedstoplaycourse1themost][element]][1] = NumberOfTimesPlayedCourse[PlayerWhoWillPlay[week][teetimethatneedstoplaycourse1themost][element]][1] + 1;
                    }
                }
                assigncount = assigncount + 1;
            } while (!(assigncount == maxassigncount));
        }
        //Assign odd course to NumberOfTimesPlayedCourse(player, course) ARRAY
        for (player = 1; player <= players; player++) {
            for (Course = 2; Course <= COURSES; Course++) {
                NumberOfTimesPlayedCourse[player][Course] = WEEKS - NumberOfTimesPlayedCourse[player][Course - 1];
            }
        }
        //Put courses in respective teetimes
        for (week = 1; week <= WEEKS; week++) {
            for (TeeTime = 1; TeeTime <= TEETIMES; TeeTime++) {
                //Find 1-course to swap with
                if (CourseWhoWillPlay[week][TeeTime][1] == 1) {
                    //Find 0-course to swap with
                    for (teetime2 = 1; teetime2 <= TEETIMES; teetime2++) {
                        if (CourseWhoWillPlay[week][teetime2][1] == 0) {
                            for (element = 1; element <= XSOMES; element++) {
                                temp = PlayerWhoWillPlay[week][TeeTime][element];
                                PlayerWhoWillPlay[week][TeeTime][element] = PlayerWhoWillPlay[week][teetime2][element];
                                PlayerWhoWillPlay[week][teetime2][element] = temp;
                                temp = CourseWhoWillPlay[week][TeeTime][element];
                                CourseWhoWillPlay[week][TeeTime][element] = CourseWhoWillPlay[week][teetime2][element];
                                CourseWhoWillPlay[week][teetime2][element] = temp;
                            }
                            break;
                        }
                    }
                }
            }
        }
        //
        // Exit Sub
        //
        //
        // '==============================================
        // 'VIEWING
        // '==============================================
        // 'Pairing Grid
        // Dim w As Long
        // PrintPairingGrid:
        //     With pairinggrid2
        //     .MaxRows = WEEKS  'Viewing
        // For TeeTime = 1 To TEETIMES
        // For w = 1 To WEEKS
        //     .Col = TeeTime
        //     .Row = w
        //     .Text = ""
        // For element = 1 To XSOMES - 1
        //     .Text = .Text & PlayerWhoWillPlay(w, TeeTime, element) & "-"
        // Next element
        //     .Text = .Text & PlayerWhoWillPlay(w, TeeTime, element) & ">>" & CourseWhoWillPlay(w, TeeTime, element)
        // Next w
        // Next TeeTime
        // End With
        //
        //
        //
        //
        // 'Coursetime grid
        // CourseGridW.MaxRows = players
        // For player = 1 To players
        // CourseGridW.Row = player
        // For Course = 1 To COURSES
        // CourseGridW.Col = Course
        // CourseGridW.Text = NumberOfTimesPlayedCourse(player, Course)
        // '    If course = 2 Then CourseGrid.Text = WEEKS - NumberOfTimesPlayedCourse(player, course - 1)
        // Next Course
        // Next player
        //
        //
        //
        //
        // Return
        //
        return PlayerWhoWillPlay;
    }
    function createArray(length, x, y, z) {
        var arr = new Array(length || 0), i = length;
        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while (i--)
                arr[length - 1 - i] = createArray.apply(this, args);
        }
        return arr;
    }
    schedule.createArray = createArray;
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function postToForm(p) {
        this.postMessage(p);
    }
})(schedule || (schedule = {}));
//wait for the start 'Calculate' message
//e is the event and e.data contains the JSON object
onmessage = function (e) {
    schedule.calculate(e.data.xsomes, e.data.players, e.data.events, e.data.courses, e.data.groups, e.data.timeslotgroups);
};
//# sourceMappingURL=schedule.js.map
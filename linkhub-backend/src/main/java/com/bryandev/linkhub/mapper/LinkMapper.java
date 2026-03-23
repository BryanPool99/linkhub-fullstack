package com.bryandev.linkhub.mapper;

import com.bryandev.linkhub.model.dto.response.CreateLinkResponseDto;
import com.bryandev.linkhub.model.dto.response.UpdateLinkResponseDto;
import com.bryandev.linkhub.model.entitIes.LinkEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LinkMapper {

    //@Mapping(target = "id", source = "id")
    //@Mapping(target = "userId", source = "userId")
    @Mapping(target = "iconType", source = "typeIcon")
    CreateLinkResponseDto linkEntityToCreateLinkResponseDto(LinkEntity linkEntity);

    //@Mapping(target = "id", source = "id")
    //@Mapping(target = "userId", source = "userId")
    @Mapping(target = "iconType", source = "typeIcon")
    UpdateLinkResponseDto linkEntityToUpdateLinkResponseDto(LinkEntity linkEntity);
}
